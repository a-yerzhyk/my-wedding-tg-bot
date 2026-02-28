import { client } from '@/services/client/client.gen'

export function setupApiClient() {
  client.instance.defaults.withCredentials = true

  client.instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.reload()
      }
      return Promise.reject(error)
    }
  )
}