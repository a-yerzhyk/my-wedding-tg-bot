import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type ToastType = 'info' | 'error' | 'warning' | 'success'

const TOAST_DEFAULT_TIMEOUT = 2000

type Toast = {
  show: boolean
  message: string
  type: ToastType
}

export const useToast = defineStore('toastStore', () => {
  const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const openTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const toast: Toast = reactive({
    show: false,
    message: '',
    type: 'info'
  })

  function showToast(message: string, type: ToastType, timeout = TOAST_DEFAULT_TIMEOUT) {
    closeToast()
    if (openTimer.value) {
      clearTimeout(openTimer.value)
      openTimer.value = null
    }
    openTimer.value = setTimeout(() => {
      setToastShowState(message, type, timeout)
    }, 200)
  }

  function setToastShowState(message: string, type: ToastType, timeout: number) {
    toast.show = true
    toast.message = message
    toast.type = type
    if (timeout === 0) return
    closeTimer.value = setTimeout(() => {
      toast.show = false
    }, timeout)
  }

  function closeToast() {
    if (toast.show) {
      closeTimer.value && clearTimeout(closeTimer.value)
      closeTimer.value = null
      toast.show = false
    }
  }

  return {
    toast,
    showToast,
    closeToast
  }
})
