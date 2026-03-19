<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getApiGalleryByGalleryId } from '@/services/client'
import type { GalleryDetail, MediaItem } from '@/services/types'
import { useRoute, useRouter } from 'vue-router'
import { backButton } from '@tma.js/sdk'
import VLightbox from '@/components/VLightbox.vue'
import {
  deleteApiGalleryMediaByMediaId,
  deleteApiGalleryMediaByMediaIdHard
} from '@/services/client';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const gallery = ref<GalleryDetail | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const media = computed<MediaItem[]>(() => {
  if (!gallery.value) return []
  const photos = gallery.value.photos.map(p => ({ ...p, mediaType: 'photo' as const }))
  const videos = gallery.value.videos.map(v => ({ ...v, mediaType: 'video' as const }))
  return [...photos, ...videos].sort((a, b) => a.uploadedAt.localeCompare(b.uploadedAt))
})

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

async function loadGallery(galleryId: string) {
  const res = await getApiGalleryByGalleryId({ path: { galleryId } })
  if (res.data) gallery.value = res.data
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function onMediaDeleted(mediaId: string) {
  if (gallery.value) {
    gallery.value.photos = gallery.value.photos.filter(p => p.id !== mediaId)
    gallery.value.videos = gallery.value.videos.filter(v => v.id !== mediaId)
  }
}

const softDelete = async (mediaId: string) => {
  deleteApiGalleryMediaByMediaId({ path: { mediaId } }).then(() => {
    onMediaDeleted(mediaId)
  })
}

const hardDelete = async (mediaId: string) => {
  deleteApiGalleryMediaByMediaIdHard({ path: { mediaId } }).then(() => {
    onMediaDeleted(mediaId)
  })
}

onMounted(async () => {
  backButton.show()
  backButton.onClick(router.back)
  if (userStore.isApproved && route.params.id && !Array.isArray(route.params.id)) {
    await loadGallery(route.params.id)
  }
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
        <p v-if="gallery.user" class="menu-view__heading text-header">
          {{ gallery.user.firstName }} {{ gallery.user.lastName }}
        </p>
      </div>
      <div class="menu-view__content">
        <div class="gallery-view__list">
          <div
            v-for="(item, index) in media"
            :key="item.id"
            class="gallery-view__item"
            :class="{ 'gallery-view__item--deleted': item.deletedAt }"
            @click="openLightbox(index)"
          >
            <img :src="item.thumbnailUrl" />
            <span
              v-if="item.mediaType === 'video' && item.duration"
              class="gallery-view__duration"
            >{{ formatDuration(item.duration) }}</span>
          </div>
        </div>
      </div>
    </div>

    <VLightbox
      v-if="gallery"
      :is-owner="gallery.isOwner"
      :media="media"
      :start-index="lightboxIndex"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
      @soft-delete="softDelete"
      @hard-delete="hardDelete"
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
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:active { opacity: 0.8 }

    &--deleted { opacity: 0.4 }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: white;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
    pointer-events: none;
  }

  &__duration {
    position: absolute;
    bottom: 4px;
    right: 3px;
    background-color: #000000;
    padding: 2px 4px 3px;
    border-radius: 5px;
    font-size: 0.65rem;
    color: white;
    pointer-events: none;
  }
}
</style>