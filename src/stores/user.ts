import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { isTMA, retrieveRawInitData } from '@tma.js/sdk'
import {
  postApiAuthTelegram,
  postApiGuestsRequest
} from '@/services/client/sdk.gen'
import type { AuthUser } from '@/services/types'

export const useUserStore = defineStore('userStore', () => {
  const user = ref<AuthUser | null>(null)
  const isLoading = ref(false)

  const isAdmin = computed(() => user.value?.role === 'admin')
  const hasStatus = computed(() => !!user.value?.approvalStatus)
  const isApproved = computed(() => user.value?.approvalStatus === 'approved' || isAdmin.value)
  const isPending = computed(() => user.value?.approvalStatus === 'pending')
  const isDenied = computed(() => user.value?.approvalStatus === 'denied')

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
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  function submitGuestRequest() {
    return postApiGuestsRequest().then(() => {
      user.value!.approvalStatus = 'pending'
    })
  }

  return {
    user,
    isLoading,
    hasStatus,
    isAdmin,
    isApproved,
    isPending,
    isDenied,
    init,
    submitGuestRequest,
  }
})