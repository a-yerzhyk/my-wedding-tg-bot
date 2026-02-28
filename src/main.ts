import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { isTMA } from '@tma.js/sdk'
import { initSDK } from './services/tma-sdk'
import { setupApiClient } from './services/api'
import '@/style/tailwind.css'
import '@/style/main.scss'

setupApiClient()

const isTma = isTMA()
if (isTma) {
  initSDK()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

const { useUserStore } = await import('./stores/user')
const userStore = useUserStore()
await userStore.init()

app.mount('#app')
