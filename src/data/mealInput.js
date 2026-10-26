export const LANDMARKS = [
  { id: 'park17', name: 'Park17 南科商場', description: '南科三路 17 號一帶' },
  { id: 'xinshi', name: '新市', description: '民生路 2 號一帶' },
]

export const CURRENT_LOCATION_ID = 'current'

export function mealLandmarkName(landmarkId) {
  if (landmarkId === CURRENT_LOCATION_ID) return '目前定位點'
  return LANDMARKS.find((item) => item.id === landmarkId)?.name || LANDMARKS[0].name
}

export const BUDGETS = [
  { value: 100, label: '100 元以內' },
  { value: 150, label: '150 元以內' },
  { value: 200, label: '200 元以內' },
  { value: 300, label: '300 元以內' },
  { value: null, label: '不限' },
]

export const INGREDIENTS = ['牛', '豬', '雞', '羊', '魚', '海鮮', '蛋', '奶', '花生', '堅果']

export const TASTES = ['辣', '清淡', '酸', '甜', '重口味']

export const DISTANCES = [1000, 2000, 3000]

export const TEXT_LIMIT = 100

const STORAGE_KEY = 'smartmeal-meal-draft'

function mealOrigin(origin) {
  if (!origin || typeof origin.lat !== 'number' || typeof origin.lng !== 'number') return null
  if (origin.lat < -90 || origin.lat > 90 || origin.lng < -180 || origin.lng > 180) return null
  return { lat: origin.lat, lng: origin.lng }
}

export function defaultMealDraft() {
  return {
    landmarkId: 'park17',
    origin: null,
    budget: 150,
    avoid: '牛',
    radius: 1000,
    tastes: ['辣'],
    text: '今天想吃辣，不想再吃便當',
  }
}

export function loadMealDraft() {
  const fallback = defaultMealDraft()
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (!saved) return fallback
    const draft = {
      ...fallback,
      ...saved,
      tastes: saved.tastes || fallback.tastes,
      origin: mealOrigin(saved.origin),
    }
    if (draft.landmarkId !== CURRENT_LOCATION_ID || !draft.origin) {
      if (draft.landmarkId === CURRENT_LOCATION_ID) draft.landmarkId = fallback.landmarkId
      draft.origin = null
    }
    return draft
  } catch {
    return fallback
  }
}

export function saveMealDraft(draft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
}
