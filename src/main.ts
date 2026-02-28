import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { isTMA } from '@tma.js/sdk'
import { initSDK } from './services/tma-sdk'

const isTma = isTMA()
if (isTma) {
  initSDK()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
