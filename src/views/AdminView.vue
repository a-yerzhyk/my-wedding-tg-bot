<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getApiGuestsRequests } from '@/services/client';
import type { GuestUser } from '@/services/types'
import { openTelegramLink } from '@tma.js/sdk'

const router = useRouter()
const userStore = useUserStore()

const usersList = ref<GuestUser[]>([])

function openProfile(username: string) {
  openTelegramLink(`https://t.me/${username}`)
}

onMounted(() => {
  if (!userStore.isAdmin) {
    router.push('/')
  }

  getApiGuestsRequests().then((response) => {
    const { data } = response
    if (data) {
      usersList.value = data
    }
  })
})
</script>

<template>
  <div class="admin-view">
    <div class="menu-view__content">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">Панель адміна</p>
        <p class="menu-view__heading text-header">Список запитів</p>
      </div>
      <div class="p-3 space-y-3" v-if="usersList.length">
        <div
          v-for="user in usersList"
          :key="user.id"
          class="guest-request__item bg-white rounded p-2"
        >
          <div class="space-y-1">
            <p>{{ user.firstName }} {{ user.lastName }}</p>
            <p
              class="link"
              @click="() => user.username && openProfile(user.username)"
            >
              @{{ user.username }}
            </p>
          </div>
          <p>{{ user.approvalStatus }}</p>
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
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }
}
</style>
