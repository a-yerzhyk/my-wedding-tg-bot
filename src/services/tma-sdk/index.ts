import { isMobile } from '@/utils/device'
import {
  backButton,
  init,
  miniApp,
  openTelegramLink,
  postEvent,
  shareURL,
  viewport
} from '@tma.js/sdk'

export async function initSDK() {
  init()
  backButton.isSupported() && backButton.mount()
  miniApp.mount()
  viewport.mount().then(() => {
    viewport.bindCssVars()
    if (!isMobile()) {
      viewport.exitFullscreen()
    }
  })

  postEvent('web_app_toggle_orientation_lock', { locked: true })
}

export function openProfile(username: string) {
  openTelegramLink(`https://t.me/${username}`)
}

export function shareBotLink() {
  if (shareURL.isAvailable()) {
    shareURL(import.meta.env.VITE_APP_URL,
      "\nПривіт! Цей бот присвячений святкуванню весілля Андрія та Марії🥳\n\nВідкривай апку щоб підтвердити участь, дізнатися більше інформації щодо святкування і багато іншого😃")
  }
}
