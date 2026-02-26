import { isMobile } from '@/utils/device'
import {
  backButton,
  init,
  miniApp,
  postEvent,
  viewport
} from '@tma.js/sdk'

export async function initSDK() {
  init()
  backButton.isSupported() && backButton.mount()
  miniApp.mount()
  viewport.mount().then(() => {
    viewport.expand()
    viewport.bindCssVars()
    viewport.isFullscreen()
    if (viewport.requestFullscreen.isAvailable() && isMobile()) {
      viewport.requestFullscreen()
    } else {
      viewport.exitFullscreen()
    }
  })

  postEvent('web_app_toggle_orientation_lock', { locked: true })
}
