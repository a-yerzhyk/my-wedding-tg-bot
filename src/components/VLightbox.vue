<script setup lang="ts">
import { ref, watch } from 'vue'
import type { MediaItem } from '@/services/types'
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  isOwner: boolean
  media: MediaItem[]
  startIndex: number
  open: boolean
}>()

const emit = defineEmits<{
  close: [],
  softDelete: [string],
  hardDelete: [string],
}>()

const user = useUserStore()

const softDelete = async (mediaId: string) => {
  close()
  emit('softDelete', mediaId)
}

const hardDelete = async (mediaId: string) => {
  close()
  emit('hardDelete', mediaId)
}

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

function pauseCurrentVideo() {
  const video = document.querySelector<HTMLVideoElement>('.lightbox__stage video')
  video?.pause()
}

function prev() {
  pauseCurrentVideo()
  transitionName.value = 'slide-right'
  activeIndex.value = (activeIndex.value - 1 + props.media.length) % props.media.length
  touchDeltaX.value = 0
}

function next() {
  pauseCurrentVideo()
  transitionName.value = 'slide-left'
  activeIndex.value = (activeIndex.value + 1) % props.media.length
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
      <div class="lightbox__controls lightbox__controls_left flex gap-2">
        <!-- hard delete -->
        <svg
          v-if="user.isAdmin"
          @click="() => hardDelete(media[activeIndex]?.id || '')"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44"
          height="44"
        >
          <circle cx="22" cy="22" r="21" fill="rgba(250,246,242,0.92)" stroke="#D4927E" stroke-width="1.2"/>
          <rect x="14" y="18" width="16" height="13" rx="2" fill="none" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="12" y1="18" x2="32" y2="18" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M19,18 v-2 a1,1 0 0 1 1-1 h4 a1,1 0 0 1 1,1 v2" fill="none" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="18" y1="21" x2="26" y2="29" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="26" y1="21" x2="18" y2="29" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="lightbox__controls flex gap-2">
        <!-- soft delete -->
        <svg
          v-if="(user.isAdmin || isOwner) && !media[activeIndex]?.deletedAt"
          @click="() => softDelete(media[activeIndex]?.id || '')"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44"
          height="44"
        >
          <circle cx="22" cy="22" r="21" fill="rgba(250,246,242,0.92)" stroke="#C9A49A" stroke-width="1.2"/>
          <rect x="14" y="18" width="16" height="13" rx="2" fill="none" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="12" y1="18" x2="32" y2="18" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M19,18 v-2 a1,1 0 0 1 1-1 h4 a1,1 0 0 1 1,1 v2" fill="none" stroke="#C0614A" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="19" y1="21" x2="19" y2="28" stroke="#C0614A" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
          <line x1="22" y1="21" x2="22" y2="28" stroke="#C0614A" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
          <line x1="25" y1="21" x2="25" y2="28" stroke="#C0614A" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
        </svg>
        <!-- close -->
        <svg
          @click="close"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 44 44"
          width="44"
          height="44"
        >
          <circle cx="22" cy="22" r="21" fill="rgba(250,246,242,0.92)" stroke="#C9A49A" stroke-width="1.2"/>
          <line x1="15" y1="15" x2="29" y2="29" stroke="#8B6B61" stroke-width="2" stroke-linecap="round"/>
          <line x1="29" y1="15" x2="15" y2="29" stroke="#8B6B61" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

      <div class="lightbox__counter">
        {{ activeIndex + 1 }} / {{ media.length }}
      </div>

      <div
        class="lightbox__stage"
        @touchstart="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <Transition :name="transitionName">
          <img
            v-if="media[activeIndex]?.mediaType === 'photo'"
            :key="'photo-' + activeIndex"
            class="lightbox__image"
            :src="media[activeIndex]?.url"
            :style="{
              transform: isSwiping || isClosing ? `translate(${touchDeltaX}px, ${touchDeltaY}px) scale(${isClosing ? 0.7 : 1})` : '',
              opacity: isClosing ? 0 : 'none',
            }"
          />
          <video
            v-else
            :key="'video-' + activeIndex"
            class="lightbox__video"
            :src="media[activeIndex]?.url"
            autoplay
            muted
            playsinline
            controls
            :style="{
              transform: isSwiping || isClosing ? `translate(${touchDeltaX}px, ${touchDeltaY}px) scale(${isClosing ? 0.7 : 1})` : '',
              opacity: isClosing ? 0 : 'none',
            }"
          />
        </Transition>
      </div>

      <!-- prev -->
      <svg
        class="lightbox__arrow lightbox__arrow--prev"
        @click="prev"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44 44"
        width="44"
        height="44"
      >
        <circle cx="22" cy="22" r="21" fill="rgba(250,246,242,0.92)" stroke="#C9A49A" stroke-width="1.2"/>
        <polyline points="25,13 16,22 25,31" fill="none" stroke="#8B6B61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <!-- next -->
       <svg
        class="lightbox__arrow lightbox__arrow--next"
        @click="next"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44 44"
        width="44"
        height="44"
      >
        <circle cx="22" cy="22" r="21" fill="rgba(250,246,242,0.92)" stroke="#C9A49A" stroke-width="1.2"/>
        <polyline points="19,13 28,22 19,31" fill="none" stroke="#8B6B61" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <div class="lightbox__dots" v-if="media.length <= 20">
        <span
          v-for="(_, i) in media"
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

  &__controls {
    position: absolute;
    top: var(--inset-top);
    right: 16px;
    display: flex;
    gap: 8px;
    z-index: 10;

    &_left {
      left: 16px;
      right: auto;
    }
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

  &__image,
  &__video {
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
    width: 48px;
    height: 48px;
    cursor: pointer;
    z-index: 10;

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

.lightbox__image,
.lightbox__video {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
  user-select: none;
  will-change: transform, opacity;
  touch-action: none;
  transition: transform 0.3s, opacity 0.3s ease;
}

// Disable transition while finger is on screen
.lightbox__stage--swiping .lightbox__image,
.lightbox__stage--swiping .lightbox__video {
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