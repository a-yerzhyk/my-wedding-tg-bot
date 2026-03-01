<script setup lang="ts">
import VButton from '@/components/VButton.vue';
import { useUserStore } from '@/stores/user';
import { openProfile } from '@/services/tma-sdk';

const userStore = useUserStore()
</script>

<template>
  <div class="photos-view">
    <div class="menu-view__content pl-[16px] pr-[16px]">
      <Transition name="fade" mode="out-in">
        <div class="text-header" v-if="userStore.isApproved">
          У розробці...
        </div>
        <div class="text-header text-center" v-else-if="userStore.isPending">
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
        <div class="flex flex-col items-center text-header text-xl gap-2" v-else-if="!userStore.isApproved">
          <p class="text-center">Для перегляду та завантаження фото вам потрібно відправити заявку</p>
          <VButton type="success" @click="userStore.submitGuestRequest">
            Прийняти запрошення
          </VButton>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photos-view {
  background: var(--background-3);

  .menu-view__content {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }
}
</style>
