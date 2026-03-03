<script setup lang="ts">
</script>

<template>
  <div class="wishlist-view">
    <div class="menu-view__container">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">можливо вам знадобиться</p>
        <p class="menu-view__heading text-header">Вішлист</p>
      </div>

      <div class="menu-view__content">
        <div class="wishlist-view__list">
          <div class="wishlist-view__item">
            <div class="wishlist-view__item-icon">
              🌸
            </div>
            <div class="wishlist-view__item-details text-primary">
              Не потрібно букетів, з якими невідомо що далі робити😅
              <br>
              Принеси одну квітку, з якої ми зробимо один великий букет!
              <br>
              <br>
              <p class="text-secondary text-xs underline">
                P.S. Без лілій! Вони токсичні для котів
              </p>
            </div>
          </div>
          <div class="wishlist-view__item">
            <div class="wishlist-view__item-icon">
              🥳
            </div>
            <div class="wishlist-view__item-details text-primary">
              А найголовнішим подарунком для нас буде ваша участь, святковий настрій та хороший апетит!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wishlist-view {
  background: var(--background-4);

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  &__item {
    background: var(--white);
    border-radius: 14px;
    padding: 14px 16px;
    box-shadow: var(--shadow-soft);
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  &__item-icon {
    flex-shrink: 0;
    font-size: 3.1rem;
  }

  &__item-details {
    font-size: .95rem;
    color: var(--text);
    flex: 1;
    line-height: 1.4;
  }
}
</style>
