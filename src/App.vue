<script setup lang="ts">
import '@/style/main.scss'
import { onMounted, ref } from 'vue';

const isMounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true
  }, 1000)
})
</script>

<template>
  <div class="app">
    <div class="view">
      <RouterView class="menu-view" v-slot="{ Component }">
        <Transition name="route-animation">
          <component :is="Component" :animate="isMounted" />
        </Transition>
      </RouterView>
    </div>
    <div class="menu">
      <RouterLink
        :to="'/'"
        class="menu__item"
        active-class="menu__item_active"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A49A" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
        <span>Дім</span>
      </RouterLink>
      <RouterLink
        :to="'/details'"
        class="menu__item"
        active-class="menu__item_active"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A49A" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Інфо</span>
      </RouterLink>
      <RouterLink
        :to="'/wishlist'"
        class="menu__item"
        active-class="menu__item_active"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A49A" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>Вішлист</span>
      </RouterLink>
      <RouterLink
        :to="'/photos'"
        class="menu__item"
        active-class="menu__item_active"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A49A" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        </svg>
        <span>Фото</span>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

.view {
  flex: 1;
  position: relative;
  background: var(--ivory);
}

.menu {
  background-color: var(--cream);
  flex: 0 0 75px;
  padding: 10px 0 max(10px, var(--inset-bottom));

  display: flex;
  justify-content: space-evenly;
  column-gap: 4px;

  &__item {
    aspect-ratio: 1.2 / 1;
    height: 100%;
    width: auto;
    border-radius: 12px;
    padding: 0 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 4px;

    font-family: var(--font-secondary);
    font-size: .55rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--text-soft);
    transition: background-color 1s ease;

    &_active {
      background-color: var(--blush);
    }
  }
}
</style>
