<script setup lang="ts">
withDefaults(defineProps<{
  galleryId: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  previews: string[];
  photoCount: number;
  videoCount?: number;
}>(), {
  avatarUrl: '',
  name: '',
  username: '',
  previews: () => [],
  videoCount: 0,
})
</script>

<template>
  <RouterLink :to="{ name: 'gallery', params: { id: galleryId }}"  class="gallery-item">
    <div class="gallery-item__header">
      <img :src="avatarUrl" alt="Avatar" class="gallery-item__avatar">
      <div class="gallery-item__user">
        <div class="gallery-item__name text-primary">{{ name }}</div>
        <div v-if="username" class="gallery-item__username text-secondary link">
          @{{ username }}
        </div>
      </div>
      <div class="text-primary text-sm">
        {{ photoCount }}📷<template v-if="videoCount">&nbsp;&nbsp;&nbsp;{{ videoCount }}🎬</template>
      </div>
    </div>
    <div class="gallery-item__divider"></div>
    <div class="gallery-item__previews">
      <img
        v-for="preview in previews"
        :key="preview"
        class="gallery-item__preview"
        :src="preview"
        alt="Preview"
      />
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.gallery-item {
  width: 100%;
  background: var(--white);
  border-radius: 14px;
  padding: 14px 16px;
  box-shadow: var(--shadow-soft);
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }

  &__user {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  &__name {
    font-size: 1rem;
  }

  &__username {
    font-size: 0.7rem;
    text-transform: lowercase;
    color: var(--dusty)
  }

  &__divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent , var(--dusty) 10%, var(--dusty) 90%, transparent);
  }

  &__previews {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 4px 0;
  }

  &__preview {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
}
</style>
