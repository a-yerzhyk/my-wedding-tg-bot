<script setup lang="ts">
import VButton from '@/components/VButton.vue';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

defineProps<{
  animate: boolean
}>()

const userStore = useUserStore()

const isRequestSent = ref(false)
function sendRequest() {
  userStore.submitGuestRequest().then(() => {
    isRequestSent.value = true
  })
}
</script>

<template>
  <div class="home-view">
    <div class="menu-view__content">
      <RouterLink v-if="userStore.isAdmin" to="/admin-panel" class="absolute top-inset-safe right-2 p-1 border border-rose rounded text-secondary text-xs">
        Адмінка
      </RouterLink>
      <Transition name="home-animation-1" >
        <div v-if="animate" class="home-view__icon">
          <svg viewBox="0 0 36 36" fill="none">
            <path d="M18 28C18 28 6 20 6 12.5C6 9.2 8.4 6.5 11.5 6.5C13.8 6.5 15.7 7.9 18 10.5C20.3 7.9 22.2 6.5 24.5 6.5C27.6 6.5 30 9.2 30 12.5C30 20 18 28 18 28Z" fill="white" opacity=".9"></path>
            <circle cx="18" cy="10" r="2" fill="white" opacity=".5"></circle>
            <circle cx="11" cy="15" r="1.5" fill="white" opacity=".4"></circle>
            <circle cx="25" cy="15" r="1.5" fill="white" opacity=".4"></circle>
          </svg>
        </div>
      </Transition>
      <Transition name="home-animation-1" >
        <p v-if="animate" class="home-view__invitation text-secondary">
          {{ userStore.user?.firstName ? userStore.user.firstName + ', ' : '' }}Ви запрошені
        </p>
      </Transition>
      <Transition name="home-animation-2" >
        <p v-if="animate" class="home-view__name text-header">
          Марія <em>&</em><br/>Андрій
        </p>
      </Transition>
      <Transition name="home-animation-3" >
        <div v-if="animate" class="home-view__divider"></div>
      </Transition>
      <Transition name="home-animation-3" >
        <p v-if="animate" class="home-view__date text-primary">
          21 Березня 2026 · Київ
        </p>
      </Transition>
      <Transition name="home-animation-3" >
        <p v-if="animate" class="home-view__decription text-primary">
          Ми будемо дуже раді розділити<br/>це свято з Вами!
        </p>
      </Transition>
      <Transition :name="!isRequestSent ? 'home-animation-3' : 'fade'">
        <VButton v-if="animate && (!userStore.hasStatus || isRequestSent)" type="success" @click="sendRequest">
          <p v-if="!userStore.hasStatus">Прийняти запрошення</p>
          <p v-else>Заявку відправлено!</p>
        </VButton>
      </Transition>
      <Transition name="home-animation-4" appear>
        <RouterLink to="/details" class="v-button v-button__primary">
          До інформації
        </RouterLink>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  background: var(--background-1);
  text-align: center;

  .menu-view__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 18px;
    padding: 32px 24px;
  }

  &__icon {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--rose) 0%, var(--blush) 100%);
    box-shadow: 0 4px 20px rgba(200, 120, 100, .2);

    svg {
      width: 36px;
      height: 36px;
    }
  }

  &__invitation {
    font-size: .65rem;
    letter-spacing: .22em;
  }

  &__name {
    font-size: 2rem;
    line-height: 1.1;
    font-weight: 400;
    text-align: left;

    em {
      color: var(--mauve);
      font-family: 'Playfair Display', serif;
    }
  }

  &__date {
    font-size: 1rem;
    letter-spacing: .06em;
  }

  &__decription {
    font-size: .95rem;
    line-height: 1.6;
  }

  &__divider {
    width: 98px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--rose), transparent);
    margin: 4px auto;
  }
}
</style>
