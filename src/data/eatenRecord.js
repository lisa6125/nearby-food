const ACCEPTED_KEY = 'smartmeal-accepted'
const PENDING_KEY = 'smartmeal-pending-meal'
const RECORDS_KEY = 'smartmeal-eaten-records'

export function saveAcceptedSelection(selection) {
  sessionStorage.setItem(ACCEPTED_KEY, JSON.stringify(selection))
}

export function loadAcceptedSelection() {
  try {
    return JSON.parse(sessionStorage.getItem(ACCEPTED_KEY) || 'null')
  } catch {
    return null
  }
}

export function mapsSearchUrl(name, address) {
  const query = [name, address].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function rememberNavigation(selection) {
  const meal = selection?.suggestion?.meal_set || {}
  const store = selection?.suggestion?.store || {}
  const pending = {
    navigated: true,
    recorded: false,
    navigatedAt: new Date().toISOString(),
    recommendation_id: selection?.suggestion?.recommendation_id || null,
    meal_set_id: meal.id || null,
    mealName: meal.name || '',
    storeName: store.name || '',
    address: store.address || '',
    distance_m: store.distance_m ?? null,
    landmark: selection?.landmark || '',
    draft: selection?.draft || null,
  }
  localStorage.setItem(PENDING_KEY, JSON.stringify(pending))
  return pending
}

export function loadPendingMeal() {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || 'null')
    if (!pending?.navigated || pending.recorded) return null
    return pending
  } catch {
    return null
  }
}

function loadRecords() {
  try {
    const records = JSON.parse(localStorage.getItem(RECORDS_KEY) || '[]')
    return Array.isArray(records) ? records : []
  } catch {
    return []
  }
}

export function submitEatenRecord(pending, eatenAt, reaction = null) {
  const records = loadRecords()
  const existing = records.find((item) => item.recommendation_id === pending.recommendation_id)
  const finished = { ...pending, navigated: false, recorded: true }
  localStorage.setItem(PENDING_KEY, JSON.stringify(finished))
  if (existing) return { created: false, record: existing }
  const record = {
    id: `er-${Date.now()}`,
    meal_set_id: pending.meal_set_id,
    recommendation_id: pending.recommendation_id,
    eaten_at: eatenAt,
    status: 'active',
    created_at: new Date().toISOString(),
    mealName: pending.mealName,
    storeName: pending.storeName,
    address: pending.address,
    draft: pending.draft,
    reaction,
  }
  records.push(record)
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
  return { created: true, record }
}
