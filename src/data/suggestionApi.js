const MEAL_REFERENCE = {
  energy_kcal: 667,
  protein_g: 20,
  fat_g: 20,
  saturated_fat_g: 6,
  carbohydrate_g: 100,
  sodium_mg: 667,
}

const pool = [
  {
    id: 'r-chili-wonton',
    distances: { park17: 350, xinshi: 4300 },
    meal_set: {
      id: 'ms-chili-wonton',
      name: '紅油抄手',
      items: [
        { name: '紅油抄手', portion: '小份' },
        { name: '燙青菜', portion: null },
      ],
      price: 90,
      taste_tags: ['辣', '重口味'],
      ingredients: ['豬'],
      nutrition: {
        energy_kcal: 540,
        protein_g: 14,
        fat_g: 16,
        saturated_fat_g: 4,
        carbohydrate_g: 72,
        sodium_mg: 980,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-18',
    },
    store: {
      id: 'st-sanlu-noodle',
      name: '三路麵食堂',
      address: '南科三路 8 號',
      hours_today: [
        { open: '11:00', close: '14:30' },
        { open: '17:00', close: '20:30' },
      ],
      hours_checked_at: '2026-10-18',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-spicy-chicken',
    distances: { park17: 180, xinshi: 4500 },
    meal_set: {
      id: 'ms-spicy-chicken',
      name: '香辣雞腿飯',
      items: [
        { name: '香辣雞腿', portion: '一隻' },
        { name: '白飯', portion: '一碗' },
        { name: '燙青菜', portion: null },
      ],
      price: 115,
      taste_tags: ['辣'],
      ingredients: ['雞'],
      nutrition: {
        energy_kcal: 690,
        protein_g: 28,
        fat_g: 22,
        saturated_fat_g: 6,
        carbohydrate_g: 82,
        sodium_mg: 860,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-18',
    },
    store: {
      id: 'st-yuanqu-bento',
      name: '園區便當舖',
      address: '南科三路 22 號',
      hours_today: [{ open: '10:30', close: '14:00' }],
      hours_checked_at: '2026-10-18',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-tomato-noodle',
    distances: { park17: 640, xinshi: 4100 },
    meal_set: {
      id: 'ms-tomato-noodle',
      name: '番茄肉醬麵',
      items: [{ name: '番茄肉醬麵', portion: '一碗' }],
      price: 85,
      taste_tags: ['酸'],
      ingredients: ['豬'],
      nutrition: {
        energy_kcal: 480,
        protein_g: 16,
        fat_g: 12,
        saturated_fat_g: 3,
        carbohydrate_g: 70,
        sodium_mg: 620,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-12',
    },
    store: {
      id: 'st-nanke-diner',
      name: '南科小館',
      address: '園區一路 9 號',
      hours_today: [{ open: '11:00', close: '20:00' }],
      hours_checked_at: '2026-10-12',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-kungpao',
    distances: { park17: 820, xinshi: 3900 },
    meal_set: {
      id: 'ms-kungpao',
      name: '宮保雞丁飯',
      items: [
        { name: '宮保雞丁', portion: null },
        { name: '白飯', portion: '一碗' },
      ],
      price: 105,
      taste_tags: ['辣', '重口味'],
      ingredients: ['雞'],
      nutrition: {
        energy_kcal: 710,
        protein_g: 26,
        fat_g: 24,
        saturated_fat_g: 7,
        carbohydrate_g: 88,
        sodium_mg: 1180,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-18',
    },
    store: {
      id: 'st-kegong',
      name: '科工快餐',
      address: '南科北路 3 號',
      hours_today: [{ open: '10:30', close: '19:30' }],
      hours_checked_at: '2026-10-18',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-beef-noodle-park',
    distances: { park17: 500, xinshi: 4600 },
    meal_set: {
      id: 'ms-beef-noodle-park',
      name: '紅燒牛肉麵',
      items: [{ name: '紅燒牛肉麵', portion: '大碗' }],
      price: 140,
      taste_tags: ['重口味'],
      ingredients: ['牛'],
      nutrition: {
        energy_kcal: 640,
        protein_g: 24,
        fat_g: 20,
        saturated_fat_g: 8,
        carbohydrate_g: 80,
        sodium_mg: 1520,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-09',
    },
    store: {
      id: 'st-laozhang',
      name: '老張牛肉麵',
      address: '南科三路 30 號',
      hours_today: [{ open: '11:00', close: '20:30' }],
      hours_checked_at: '2026-10-09',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-mala-dry',
    distances: { park17: 4400, xinshi: 240 },
    meal_set: {
      id: 'ms-mala-dry',
      name: '麻辣乾麵',
      items: [{ name: '麻辣乾麵', portion: '大碗' }],
      price: 95,
      taste_tags: ['辣', '重口味'],
      ingredients: ['豬'],
      nutrition: {
        energy_kcal: 620,
        protein_g: 18,
        fat_g: 22,
        saturated_fat_g: 7,
        carbohydrate_g: 85,
        sodium_mg: 1580,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-18',
    },
    store: {
      id: 'st-minsheng-noodle',
      name: '民生麵店',
      address: '民生路 18 號',
      hours_today: [{ open: '11:00', close: '21:00' }],
      hours_checked_at: '2026-10-18',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-hot-sour-dumpling',
    distances: { park17: 4200, xinshi: 510 },
    meal_set: {
      id: 'ms-hot-sour-dumpling',
      name: '酸辣湯餃',
      items: [
        { name: '酸辣湯餃', portion: '十顆' },
        { name: '小菜', portion: null },
      ],
      price: 80,
      taste_tags: ['辣', '酸'],
      ingredients: ['豬'],
      nutrition: {
        energy_kcal: 430,
        protein_g: 15,
        fat_g: 14,
        saturated_fat_g: 4,
        carbohydrate_g: 55,
        sodium_mg: 890,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-15',
    },
    store: {
      id: 'st-xinshi-dumpling',
      name: '新市湯餃',
      address: '民生路 36 號',
      hours_today: [
        { open: '10:30', close: '14:00' },
        { open: '16:30', close: '20:00' },
      ],
      hours_checked_at: '2026-10-15',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-congee',
    distances: { park17: 4000, xinshi: 160 },
    meal_set: {
      id: 'ms-congee',
      name: '清粥小菜',
      items: [
        { name: '清粥', portion: '一碗' },
        { name: '小菜', portion: '三樣' },
      ],
      price: 70,
      taste_tags: ['清淡'],
      ingredients: ['蛋'],
      nutrition: {
        energy_kcal: 360,
        protein_g: 12,
        fat_g: 8,
        saturated_fat_g: 2,
        carbohydrate_g: 58,
        sodium_mg: 540,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-11',
    },
    store: {
      id: 'st-lane-congee',
      name: '巷口清粥',
      address: '民生路 8 號',
      hours_today: [{ open: '06:30', close: '13:30' }],
      hours_checked_at: '2026-10-11',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-fish-noodle',
    distances: { park17: 4700, xinshi: 760 },
    meal_set: {
      id: 'ms-fish-noodle',
      name: '香魚麵',
      items: [{ name: '香魚麵', portion: '一碗' }],
      price: 130,
      taste_tags: ['辣'],
      ingredients: ['魚'],
      nutrition: {
        energy_kcal: 560,
        protein_g: 22,
        fat_g: 18,
        saturated_fat_g: 4,
        carbohydrate_g: 74,
        sodium_mg: 760,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-16',
    },
    store: {
      id: 'st-fish-noodle',
      name: '魚麵小館',
      address: '中正路 21 號',
      hours_today: [{ open: '11:00', close: '20:00' }],
      hours_checked_at: '2026-10-16',
      source_label: '門市公告',
    },
  },
  {
    id: 'r-beef-soup',
    distances: { park17: 4800, xinshi: 400 },
    meal_set: {
      id: 'ms-beef-soup',
      name: '牛肉湯',
      items: [
        { name: '牛肉湯', portion: '一碗' },
        { name: '白飯', portion: '一碗' },
      ],
      price: 120,
      taste_tags: ['清淡'],
      ingredients: ['牛'],
      nutrition: {
        energy_kcal: 510,
        protein_g: 27,
        fat_g: 16,
        saturated_fat_g: 6,
        carbohydrate_g: 60,
        sodium_mg: 720,
      },
      source_label: '店家菜單',
      checked_at: '2026-10-08',
    },
    store: {
      id: 'st-xinshi-beef',
      name: '新市牛肉湯',
      address: '民生路 50 號',
      hours_today: [{ open: '06:00', close: '13:00' }],
      hours_checked_at: '2026-10-08',
      source_label: '門市公告',
    },
  },
]

function compare(nutrition) {
  return Object.fromEntries(
    Object.entries(MEAL_REFERENCE).map(([key, reference]) => [
      key,
      Math.round((nutrition[key] / reference) * 100) / 100,
    ]),
  )
}

function distanceOf(item, landmarkId) {
  if (typeof item.distances[landmarkId] === 'number') return item.distances[landmarkId]
  return item.distances.park17
}

function fits(item, draft) {
  const distance = distanceOf(item, draft.landmarkId)
  if (typeof draft.radius === 'number' && distance > draft.radius) return false
  if (typeof draft.budget === 'number' && item.meal_set.price > draft.budget) return false
  if (draft.avoid && item.meal_set.ingredients.includes(draft.avoid)) return false
  return true
}

function tasteMatched(item, draft) {
  const tastes = Array.isArray(draft.tastes) ? draft.tastes : []
  return item.meal_set.taste_tags.some((taste) => tastes.includes(taste))
}

function reasonText(item, draft, matched) {
  const meal = item.meal_set
  const wanted = (Array.isArray(draft.tastes) ? draft.tastes : []).join('、')
  const tastes = meal.taste_tags.join('、')
  if (matched) {
    return `你今天想吃${wanted}，這份${meal.name}對得上，${meal.price} 元，也在搜尋距離裡。`
  }
  if (wanted) {
    return `你今天想吃${wanted}，這份是${tastes}，沒有對上。${meal.price} 元，還在搜尋距離裡。`
  }
  return `這份${meal.name}是${tastes}，${meal.price} 元，在你選的搜尋距離裡。`
}

function toSuggestion(item, draft) {
  const matched = tasteMatched(item, draft)
  return {
    outcome: 'recommended',
    recommendation_id: item.id,
    selected_by: 'ai',
    match: matched ? 'matched' : 'no_preference',
    meal_set: item.meal_set,
    store: {
      ...item.store,
      distance_m: distanceOf(item, draft.landmarkId),
    },
    reason: { text: reasonText(item, draft, matched), written_by: 'ai' },
    nutrition_compare: compare(item.meal_set.nutrition),
  }
}

export function loadSuggestions(draft) {
  const picked = pool.filter((item) => fits(item, draft))
  const source = (picked.length > 0 ? picked : pool).slice().sort((a, b) => {
    return Number(tasteMatched(b, draft)) - Number(tasteMatched(a, draft))
  })
  return source.map((item) => toSuggestion(item, draft))
}
