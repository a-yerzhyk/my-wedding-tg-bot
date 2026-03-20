<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { GalleryDetail } from '@/services/types'
import { useRouter } from 'vue-router'
import { backButton } from '@tma.js/sdk'
import { testGallery } from '@/constants/test'
import VLightbox from '@/components/VLightbox.vue'
import VButton from '@/components/VButton.vue'
import { useToast } from '@/stores/toast'

const toast = useToast()
const router = useRouter()
const gallery = ref<GalleryDetail | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

async function loadGallery() {
  gallery.value = testGallery
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function button1Click() {
  toast.showToast('spinner', 'warning', 2000)
}

onMounted(async () => {
  backButton.show()
  backButton.onClick(router.back)
  await loadGallery()
})

onUnmounted(() => {
  backButton.hide()
  backButton.offClick(router.back)
})
</script>

<template>
  <div class="gallery-view">
    <div class="menu-view__container" v-if="gallery">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">галерея гостя</p>
      </div>
      <VButton @click="button1Click">click</VButton>
      <div class="menu-view__content">
        <div class="gallery-view__list">
          <img
            v-for="(photo, index) in gallery.photos"
            :key="photo.id"
            class="gallery-view__item"
            :src="photo.thumbnailUrl"
            @click="openLightbox(index)"
          />
        </div>
      </div>
    </div>

    <VLightbox
      v-if="gallery"
      :is-owner="gallery.isOwner"
      :media="gallery.photos.map(p => ({ ...p, mediaType: 'photo' as const }))"
      :start-index="lightboxIndex"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  background: var(--background-3);

  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.2rem;
  }

  &__item {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: var(--shadow-soft);
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:active { opacity: 0.8 }
  }
}
</style>