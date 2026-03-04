<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted, onUnmounted, ref } from 'vue'
import { getApiGalleryByGalleryId } from '@/services/client'
import type { GalleryDetail } from '@/services/types'
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

async function loadGallery(galleryId: string) {
  const res = await getApiGalleryByGalleryId({ path: { galleryId } })
  if (res.data) gallery.value = res.data
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

function onPhotoDeleted(mediaId: string) {
  if (gallery.value) {
    gallery.value.photos = gallery.value.photos.filter(photo => photo.id !== mediaId)
  }
}

const softDelete = async (mediaId: string) => {
  deleteApiGalleryMediaByMediaId({ path: { mediaId } }).then(() => {
    onPhotoDeleted(mediaId)
  })
}

const hardDelete = async (mediaId: string) => {
  deleteApiGalleryMediaByMediaIdHard({ path: { mediaId } }).then(() => {
    onPhotoDeleted(mediaId)
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
      :photos="gallery.photos"
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