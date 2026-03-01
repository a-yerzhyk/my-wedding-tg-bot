<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getApiGuestsRequests } from '@/services/client';
import type { GuestUser } from '@/services/types'
import { openProfile } from '@/services/tma-sdk';
import VButton from '@/components/VButton.vue';
import { updateGuestRequestStatus } from '@/services/api';

const router = useRouter()
const userStore = useUserStore()

const usersList = ref<GuestUser[]>([])

const approveUser = (userId: string) => {
  updateGuestRequestStatus(userId, 'approve').then(() => {
    usersList.value = usersList.value.map((user) => {
      if (user.id === userId) {
        user.approvalStatus = 'approved'
      }
      return user
    })
  }).catch(() => {
    console.log('error')
  })
}

const denyUser = (userId: string) => {
  updateGuestRequestStatus(userId, 'deny').then(() => {
    usersList.value = usersList.value.map((user) => {
      if (user.id === userId) {
        user.approvalStatus = 'denied'
      }
      return user
    })
  }).catch(() => {
    console.log('error')
  })
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
          <div class="">
            <p class="text-primary text-base">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p
              class="link text-sm"
              @click="() => user.username && openProfile(user.username)"
            >
              @{{ user.username }}
            </p>
          </div>
          <Transition name="fade">
            <div v-if="user.approvalStatus === 'pending'" class="flex gap-x-1">
              <VButton
                type="danger"
                size="small"
                @click="() => denyUser(user.id)"
              >
                deny
              </VButton>
              <VButton
                type="success"
                size="small"
                @click="() => approveUser(user.id)"
              >
                approve
              </VButton>
            </div>
            <div
              v-else-if="user.approvalStatus"
              class="chip"
              :class="{
                'chip_sage': user.approvalStatus === 'approved',
              }"
            >
              {{ user.approvalStatus }}
            </div>
          </Transition>
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
