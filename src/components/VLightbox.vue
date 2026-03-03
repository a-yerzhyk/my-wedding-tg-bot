<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Photo } from '@/services/types'

const props = defineProps<{
  photos: Photo[]
  startIndex: number
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const activeIndex = ref(props.startIndex)
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchDeltaX = ref(0)
const touchDeltaY = ref(0)
const isSwiping = ref(false)
const swipeDirection = ref<'horizontal' | 'vertical' | null>(null)
const isClosing = ref(false)

watch(() => props.open, (val) => {
  if (val) {
    activeIndex.value = props.startIndex
    isClosing.value = false
  }
})

watch(() => props.startIndex, (val) => {
  activeIndex.value = val
})

function close() {
  touchDeltaX.value = 0
  touchDeltaY.value = 0
  swipeDirection.value = null
  emit('close')
}

const transitionName = ref('slide-left')

function prev() {
  transitionName.value = 'slide-right'
  activeIndex.value = (activeIndex.value - 1 + props.photos.length) % props.photos.length
  touchDeltaX.value = 0
}

function next() {
  transitionName.value = 'slide-left'
  activeIndex.value = (activeIndex.value + 1) % props.photos.length
  touchDeltaX.value = 0
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0]?.clientX ?? 0
  touchStartY.value = e.touches[0]?.clientY ?? 0
  touchDeltaX.value = 0
  touchDeltaY.value = 0
  swipeDirection.value = null
  isSwiping.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!isSwiping.value) return

  const dx = (e.touches[0]?.clientX ?? 0) - touchStartX.value
  const dy = (e.touches[0]?.clientY ?? 0) - touchStartY.value

  // Lock swipe direction after 10px movement
  if (!swipeDirection.value && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
    swipeDirection.value = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical'
  }

  if (swipeDirection.value === 'horizontal') {
    touchDeltaX.value = dx
    touchDeltaY.value = 0
  } else if (swipeDirection.value === 'vertical') {
    touchDeltaY.value = dy
    touchDeltaX.value = 0
    e.preventDefault() // prevent page scroll when swiping vertically
  }
}

function onTouchEnd() {
  if (swipeDirection.value === 'horizontal') {
    if (Math.abs(touchDeltaX.value) > 60) {
      touchDeltaX.value < 0 ? next() : prev()
    } else {
      touchDeltaX.value = 0
    }
  } else if (swipeDirection.value === 'vertical') {
    if (Math.abs(touchDeltaY.value) > 100) {
      isClosing.value = true
      setTimeout(close, 250)
    } else {
      touchDeltaY.value = 0
    }
  }

  isSwiping.value = false
}
</script>

<template>
  <Transition name="lightbox">
    <div
      v-if="open"
      class="lightbox"
      @click.self="close"
      tabindex="0"
    >
      <!-- Background dims as you swipe down -->
      <div
        class="lightbox__backdrop"
        :style="{
          opacity: isClosing ? 0 : Math.max(0, 1 - Math.abs(touchDeltaY) / 300)
        }"
      ></div>

      <button class="lightbox__close" @click="close">✕</button>

      <div class="lightbox__counter">
        {{ activeIndex + 1 }} / {{ photos.length }}
      </div>

      <div
        class="lightbox__stage"
        @touchstart="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <Transition :name="transitionName">
          <img
            :key="activeIndex"
            class="lightbox__image"
            :src="photos[activeIndex]?.url"
            :style="{
              transform: isSwiping || isClosing ? `translate(${touchDeltaX}px, ${touchDeltaY}px) scale(${isClosing ? 0.7 : 1})` : '',
              opacity: isClosing ? 0 : 'none',
            }"
          />
        </Transition>
      </div>

      <button
        class="lightbox__arrow lightbox__arrow--prev"
        @click="prev"
      >‹</button>
      <button
        class="lightbox__arrow lightbox__arrow--next"
        @click="next"
      >›</button>

      <div class="lightbox__dots" v-if="photos.length <= 20">
        <span
          v-for="(_, i) in photos"
          :key="i"
          class="lightbox__dot"
          :class="{ 'lightbox__dot--active': i === activeIndex }"
          @click="activeIndex = i"
        ></span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  &__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    transition: opacity 0.05s linear;
    z-index: 0;
  }

  &__close {
    position: absolute;
    top: var(--inset-top);
    right: 16px;
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    font-size: 1.25rem;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover { background: rgba(255, 255, 255, 0.25) }
  }

  &__counter {
    position: absolute;
    top: calc(var(--inset-top) + 4px);
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    z-index: 10;
  }

  &__stage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 1;
  }

  &__image {
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
    user-select: none;
    will-change: transform, opacity;
    touch-action: none;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    font-size: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 0 0 2px 0;  // ← slight nudge down to optically center ‹ ›
    z-index: 10;
    transition: background 0.2s;

    &:hover { background: rgba(255, 255, 255, 0.25) }
    &--prev { left: 12px }
    &--next { right: 12px }
  }

  &__dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
  }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &--active {
      background: white;
      transform: scale(1.3);
    }
  }
}

.lightbox__image {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
  user-select: none;
  will-change: transform, opacity;
  touch-action: none;
  transition: transform 0.3s, opacity 0.3s ease;
}

// Disable transition while finger is on screen
.lightbox__stage--swiping .lightbox__image {
  transition: none;
}

// Lightbox open/close
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.1s ease;
  .lightbox__backdrop { transition: opacity 0.1s ease; }
}
.lightbox-enter-from,
.lightbox-leave-to { opacity: 0 }

// Shared active state
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s, opacity 0.3s ease;
  position: absolute;
}

// Next — slides from right
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

// Prev — slides from left
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>