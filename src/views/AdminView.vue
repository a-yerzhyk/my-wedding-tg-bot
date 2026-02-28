<script setup lang="ts">
</script>

<template>
  <div class="admin-view">
    <div class="menu-view__content">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">Панель адміна</p>
        <p class="menu-view__heading text-header">Список запитів</p>
      </div>
      <div class="p-3 space-y-3">
        <div class="guest-request__item bg-white rounded p-2">
          <p>Марія Андрій</p>
          <p>maria.andriy@gmail.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-view {
  background: var(--background-4);
}

.guest-request {
  &__item {
    box-shadow: var(--shadow-soft);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
}
</style>
