import { isMobile } from '@/utils/device'
import {
  backButton,
  init,
  miniApp,
  postEvent,
  // swipeBehavior,
  viewport
} from '@tma.js/sdk'

const MAIN_HEADER_COLOR_RGB = '#FEF9F5'

export async function initSDK() {
  init()
  backButton.isSupported() && backButton.mount()
  miniApp.mount(), miniApp.setHeaderColor(MAIN_HEADER_COLOR_RGB)
  viewport.mount().then(() => {
    viewport.expand()
    viewport.bindCssVars()
    viewport.isFullscreen()
    if (!viewport.isFullscreen() && viewport.requestFullscreen.isAvailable() && isMobile()) {
      viewport.requestFullscreen()
    }
  })
  // swipeBehavior.isSupported() && (swipeBehavior.mount(), swipeBehavior.disableVertical())

  postEvent('web_app_toggle_orientation_lock', { locked: true })
}
