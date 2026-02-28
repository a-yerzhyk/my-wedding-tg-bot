import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { isTMA, retrieveRawInitData } from '@tma.js/sdk'
import {
  postApiAuthTelegram,
  getApiGuestsRequestMe,
  postApiGuestsRequest
} from '@/services/client/sdk.gen'
import type { GetApiGuestsRequestMeResponse, PostApiAuthTelegramResponse } from '@/services/client'

export type UserStatus = GetApiGuestsRequestMeResponse['status']
export type User = PostApiAuthTelegramResponse['user']

export const useUserStore = defineStore('userStore', () => {
  const user = ref<User | null>(null)
  const status = ref<UserStatus | null>(null)
  const isLoading = ref(false)

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isApproved = computed(() => status.value === 'approved' || isAdmin.value)
  const isPending = computed(() => status.value === 'pending')
  const isDenied = computed(() => status.value === 'denied')

  async function init() {
    if (!isTMA()) {
      console.log('Cannot authenticate: user is not in Telegram Mini App')
      return
    }
    
    const initData = retrieveRawInitData()

    if (!initData) {
      console.log('no init data')
      return
    }

    isLoading.value = true

    try {
      const response = await postApiAuthTelegram({
        body: { initData }
      })

      if (!response.data) {
        throw new Error('Authentication failed')
      }

      user.value = response.data.user

      // Fetch guest request status after auth
      await fetchStatus()
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchStatus() {
    // Admins are always approved — no need to check request status
    if (isAdmin.value) {
      status.value = 'approved'
      return
    }

    try {
      const res = await getApiGuestsRequestMe()
      if (!res.data) {
        throw new Error('Failed to fetch guest request status')
      }
      status.value = res.data.status
    } catch {
      // No request submitted yet
      status.value = null
    }
  }

  function submitGuestRequest() {
    postApiGuestsRequest().then(() => {
      status.value = 'pending'
    })
  }

  return {
    user,
    status,
    isLoading,
    isAdmin,
    isApproved,
    isPending,
    isDenied,
    init,
    fetchStatus,
    submitGuestRequest,
  }
})