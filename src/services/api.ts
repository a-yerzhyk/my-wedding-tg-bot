import { client } from '@/services/client/client.gen'
import { patchApiGuestsRequestsByUserId } from './client'

export function setupApiClient() {
  client.instance.defaults.withCredentials = true

  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // if (error.response?.status === 401) {
      //   window.location.reload()
      // }
      return Promise.reject(error)
    }
  )
}

export function updateGuestRequestStatus(userId: string, action: 'approve' | 'deny') {
  return patchApiGuestsRequestsByUserId({
    path: {
      userId
    },
    body: {
      action: action
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error('Failed to update guest request status')
    }
  })
}
