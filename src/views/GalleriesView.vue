<script setup lang="ts">
import VButton from '@/components/VButton.vue';
import { useUserStore } from '@/stores/user';
import { openProfile } from '@/services/tma-sdk';
import { onMounted, ref } from 'vue';
import { getApiGallery } from '@/services/client';
import type { Gallery } from '@/services/types';
import GalleryItem from '@/components/GalleryItem.vue';

const userStore = useUserStore()
const galleries = ref<Gallery[]>([])

async function loadGalleries() {
  const res = await getApiGallery()
  if (res.data) {
    galleries.value = res.data
  }
}

onMounted(async () => {
  if (userStore.isApproved) {
    await loadGalleries()
  }
})
</script>

<template>
  <div class="galleries-view">
    <div class="menu-view__container">
      <div class="menu-view__header" v-if="userStore.isApproved">
        <p class="menu-view__subheading text-secondary">завантажуй свої фото у бот</p>
        <p class="menu-view__heading text-header">Галерея</p>
      </div>
      <div class="menu-view__content space-y-3" v-if="userStore.isApproved && galleries.length > 0">
        <GalleryItem
          v-for="gallery in galleries"
          :key="gallery.id"
          :galleryId="gallery.id"
          :avatarUrl="gallery.user.avatarUrl"
          :name="gallery.user.firstName"
          :username="gallery.user.username"
          :previews="gallery.previews"
          :photoCount="gallery.photoCount"
          :videoCount="gallery.videoCount"
        />
      </div>
      <p 
        v-else-if="userStore.isApproved"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-header w-full text-center"
      >
        Галерея наразі порожня
      </p>
      <div v-if="!userStore.isApproved" class="w-full h-full flex justify-center items-center pl-[16px] pr-[16px]">
        <Transition name="fade" mode="out-in">
          <div class="text-header text-center" v-if="userStore.isPending">
            Ваша заявка розглядається.<br/>
            Для пришвидшення процесу розгляду зверніться до винуватців цього дійства :)<br/>
            <div class="flex justify-center gap-2 text-lg">
              <p class="link" @click="() => openProfile('andriiyer')">
                @andriiyer
              </p>
              <p class="link" @click="() => openProfile('Mariia_bittersweet')">
                @Mariia_bittersweet
              </p>
            </div>
          </div>
          <p class="text-header" v-else-if="userStore.isDenied">
            Ваша заявка відхилена
          </p>
          <div class="flex flex-col items-center text-header text-xl gap-2" v-else>
            <p class="text-center">Для перегляду та завантаження фото вам потрібно відправити заявку</p>
            <VButton type="success" @click="userStore.submitGuestRequest">
              Прийняти запрошення
            </VButton>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.galleries-view {
  background: var(--background-3);

  .menu-view__container {
    font-size: 1.5rem;
  }
}
</style>
