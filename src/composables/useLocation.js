import { ref } from 'vue'
import { DEFAULT_ORIGIN } from '../data/mock'

const position = ref({ ...DEFAULT_ORIGIN })
const status = ref('idle')

let started = false

function locate() {
  status.value = 'locating'

  if (!navigator.geolocation) {
    position.value = { ...DEFAULT_ORIGIN }
    status.value = 'unsupported'
    return
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      position.value = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        label: '目前位置',
        source: 'gps',
      }
      status.value = 'ready'
    },
    () => {
      position.value = { ...DEFAULT_ORIGIN }
      status.value = 'denied'
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
  )
}

export function requestUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('unsupported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      () => reject(new Error('denied')),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    )
  })
}

export function useLocation() {
  if (!started) {
    started = true
    locate()
  }

  return { position, status, locate }
}
