<script setup lang="ts">
</script>

<template>
  <div class="details-view">
    <div class="menu-view__content">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">Зарезервуйте дату</p>
        <p class="menu-view__heading text-header">Інформація</p>
      </div>

      <div class="details-view__list">
        <div class="details-view__item">
          <div class="details-view__item-icon">
            📅
          </div>
          <div class="details-view__item-body">
            <p class="details-view__item-title text-secondary">
              Дата та час
            </p>
            <p class="details-view__item-info text-header">
              Субота, 21 березня 2026
            </p>
            <p class="details-view__item-details text-primary">
              · Аперитив: 14:00<br/>
              · Банкет: 15:00
            </p>
          </div>
        </div>
      </div>

      <div class="details-view__list">
        <div class="details-view__item">
          <div class="details-view__item-icon">
            📍
          </div>
          <div class="details-view__item-body">
            <p class="details-view__item-title text-secondary">
              Місце проведення
            </p>
            <p class="details-view__item-info text-header">
              Сafe Charlotte
            </p>
            <p class="details-view__item-details text-primary">
              Oleksandra Konysʹkoho 55, Kyiv, Ukraine
            </p>
          </div>
        </div>
      </div>

      <div class="details-view__list">
        <div class="details-view__item">
          <div class="details-view__item-icon">
            💃
          </div>
          <div class="details-view__item-body">
            <p class="details-view__item-title text-secondary">
              Дрес-код
            </p>
            <p class="details-view__item-info text-header">
              Святковий
            </p>
            <p class="details-view__item-details text-primary">
              Одягнися чисто і святково. Жодних тематичних кольорів, лише краса та комфорт
            </p>
          </div>
        </div>
      </div>

      <a href="https://maps.app.goo.gl/yrZmJ9LNEyVRReXJ8" target="_blank" class="map-placeholder">
        📍Відкрити у картах
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-view {
  background: var(--background-2);

  &__list {
    padding: 8px 16px 16px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
  }

  &__item {
    background: var(--white);
    border-radius: 16px;
    padding: 16px;
    box-shadow: var(--shadow-soft);
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  &__item-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--blush) 0%, var(--rose) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 1.1rem;
  }

  &__item-body {
    display: flex;
    flex-direction: column;
  }
  &__item-title {
    font-size: .72rem;
    font-weight: 500;
    letter-spacing: .08em;
    margin-bottom: 4px;
  }
  &__item-info {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 2px;
  }
  &__item-details {
    font-size: .85rem;
  }
  
  .map-placeholder {
    margin: 0 16px;
    border-radius: 16px;
    height: 100px;
    background: linear-gradient(135deg, var(--sage) 0%, var(--sage-deep) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-secondary);
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .1em;
    color: white;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }
}
</style>
