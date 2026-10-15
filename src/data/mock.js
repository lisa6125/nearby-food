export const DEFAULT_ORIGIN = {
  lat: 25.033964,
  lng: 121.564468,
  label: '台北市信義區（預設）',
  source: 'default',
}

export const preferenceRecords = [
  {
    id: 'p1',
    at: '今天 12:18',
    summary: '午餐想吃熱食，不要油炸。',
    detail: '你說「想吃熱的，炸物先排除」。',
    tags: ['熱食'],
  },
  {
    id: 'p2',
    at: '昨天 19:42',
    summary: '常選日式，辣度停在小辣。',
    detail: '連續三次點了拉麵和丼飯，並把辣度改成小辣。',
    tags: ['日式', '微辣'],
  },
  {
    id: 'p3',
    at: '週一 13:05',
    summary: '一人預算大約 200–350 元。',
    detail: '你略過了客單價 500 元以上的店。',
    tags: ['親民'],
  },
]

export const restaurants = [
  {
    id: 'r1',
    name: '旬味割烹',
    cuisine: '日式',
    tags: ['日式', '熱食', '微辣'],
    rating: 4.8,
    reviews: 862,
    priceLevel: 3,
    priceLabel: 'NT$320–580',
    eta: '25–40 分',
    fee: 49,
    north: 420,
    east: -180,
    address: '信義路五段 18 巷 6 號',
    hours: '11:30–14:30、17:30–21:30',
    dishes: ['炙燒鮭魚丼', '季節煮物', '玉子燒'],
    blurb: '小間板前，午間供應定食。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r2',
    name: '老鍋牛肉麵',
    cuisine: '中式',
    tags: ['中式', '熱食', '親民'],
    rating: 4.6,
    reviews: 2104,
    priceLevel: 1,
    priceLabel: 'NT$160–240',
    eta: '15–25 分',
    fee: 0,
    north: -260,
    east: 340,
    address: '松壽路 12 號',
    hours: '11:00–21:00',
    dishes: ['紅燒牛肉麵', '清燉牛肉麵', '小菜'],
    blurb: '湯頭每天現熬，麵條可選寬細。',
    promo: '滿 $300 折 $30',
    image:
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r3',
    name: '街角漢堡',
    cuisine: '美式',
    tags: ['美式', '親民'],
    rating: 4.4,
    reviews: 1533,
    priceLevel: 2,
    priceLabel: 'NT$190–320',
    eta: '20–30 分',
    fee: 35,
    north: 760,
    east: 220,
    address: '松仁路 58 號',
    hours: '11:00–22:00',
    dishes: ['經典牛肉堡', '脆薯', '奶昔'],
    blurb: '現點現做，可加起司或蛋。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r4',
    name: '首爾拌飯',
    cuisine: '韓式',
    tags: ['韓式', '熱食', '微辣', '親民'],
    rating: 4.5,
    reviews: 980,
    priceLevel: 2,
    priceLabel: 'NT$220–360',
    eta: '20–35 分',
    fee: 39,
    north: -640,
    east: -280,
    address: '基隆路一段 388 號',
    hours: '11:30–21:00',
    dishes: ['石鍋拌飯', '泡菜鍋', '海鮮煎餅'],
    blurb: '辣度可調，小辣是店裡最常點的。',
    promo: '免外送費',
    image:
      'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r5',
    name: '深夜拉麵',
    cuisine: '日式',
    tags: ['日式', '熱食', '微辣'],
    rating: 4.7,
    reviews: 1740,
    priceLevel: 2,
    priceLabel: 'NT$230–340',
    eta: '20–30 分',
    fee: 29,
    north: 180,
    east: 610,
    address: '松勤街 90 號',
    hours: '17:00–02:00',
    dishes: ['豚骨拉麵', '味增拉麵', '叉燒飯'],
    blurb: '湯頭可選濃淡，加麵不加價。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r6',
    name: '森咖啡',
    cuisine: '咖啡',
    tags: ['咖啡', '親民'],
    rating: 4.6,
    reviews: 640,
    priceLevel: 1,
    priceLabel: 'NT$90–220',
    eta: '10–20 分',
    fee: 0,
    north: -120,
    east: -520,
    address: '忠孝東路五段 68 巷',
    hours: '08:00–18:30',
    dishes: ['拿鐵', '手沖', '司康'],
    blurb: '座位不多，外帶為主。',
    promo: '滿 $300 折 $30',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r7',
    name: '甜點研究所',
    cuisine: '甜點',
    tags: ['甜點', '親民'],
    rating: 4.5,
    reviews: 1102,
    priceLevel: 2,
    priceLabel: 'NT$140–280',
    eta: '15–25 分',
    fee: 25,
    north: 980,
    east: -460,
    address: '逸仙路 42 號',
    hours: '12:00–20:00',
    dishes: ['巴斯克', '水果塔', '布丁'],
    blurb: '每日數量有限，售完即止。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r8',
    name: '麻辣江湖',
    cuisine: '火鍋',
    tags: ['火鍋', '熱食'],
    rating: 4.3,
    reviews: 756,
    priceLevel: 3,
    priceLabel: 'NT$450–780',
    eta: '35–50 分',
    fee: 59,
    north: -880,
    east: 720,
    address: '市府路 45 號',
    hours: '11:30–22:30',
    dishes: ['麻辣鍋', '菌菇拼盤', '手工麵'],
    blurb: '鍋底可一半不辣，適合小辣偏好。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r9',
    name: '青葉壽司',
    cuisine: '日式',
    tags: ['日式', '親民'],
    rating: 4.4,
    reviews: 1320,
    priceLevel: 1,
    priceLabel: 'NT$120–260',
    eta: '15–25 分',
    fee: 0,
    north: 240,
    east: -860,
    address: '吳興街 156 號',
    hours: '11:00–20:30',
    dishes: ['綜合壽司', '鮭魚握', '味噌湯'],
    blurb: '迴轉壽司，單貫價格清楚。',
    promo: '免外送費',
    image:
      'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r10',
    name: '南洋小館',
    cuisine: '東南亞',
    tags: ['東南亞', '熱食', '微辣', '親民'],
    rating: 4.6,
    reviews: 890,
    priceLevel: 2,
    priceLabel: 'NT$180–300',
    eta: '20–35 分',
    fee: 35,
    north: 540,
    east: 840,
    address: '松高路 12 號',
    hours: '11:00–21:00',
    dishes: ['海南雞飯', '叻沙', '沙爹'],
    blurb: '辣醬分開附，可自己加。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r11',
    name: '炭火牛排',
    cuisine: '美式',
    tags: ['美式', '熱食'],
    rating: 4.2,
    reviews: 540,
    priceLevel: 3,
    priceLabel: 'NT$480–860',
    eta: '30–45 分',
    fee: 69,
    north: -1180,
    east: 160,
    address: '忠孝東路四段 200 號',
    hours: '17:00–22:00',
    dishes: ['肋眼', '薯條', '凱薩沙拉'],
    blurb: '熟度可指定，附湯與麵包。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r12',
    name: '阿嬤餃子',
    cuisine: '中式',
    tags: ['中式', '熱食', '親民'],
    rating: 4.7,
    reviews: 2466,
    priceLevel: 1,
    priceLabel: 'NT$120–220',
    eta: '15–25 分',
    fee: 0,
    north: 140,
    east: 180,
    address: '莊敬路 226 號',
    hours: '11:00–20:00',
    dishes: ['高麗菜水餃', '酸辣湯', '小籠包'],
    blurb: '水餃現包，湯是熱食。',
    promo: '滿 $300 折 $30',
    image:
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r13',
    name: '抹茶專門',
    cuisine: '甜點',
    tags: ['甜點', '日式'],
    rating: 4.5,
    reviews: 701,
    priceLevel: 2,
    priceLabel: 'NT$160–280',
    eta: '15–25 分',
    fee: 29,
    north: -420,
    east: -980,
    address: '光復南路 240 巷',
    hours: '12:00–19:30',
    dishes: ['抹茶冰淇淋', '蕨餅', '焙茶拿鐵'],
    blurb: '抹茶每日研磨，甜度可調。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r14',
    name: '泰式船麵',
    cuisine: '東南亞',
    tags: ['東南亞', '熱食', '微辣', '親民'],
    rating: 4.4,
    reviews: 833,
    priceLevel: 1,
    priceLabel: 'NT$150–260',
    eta: '15–30 分',
    fee: 25,
    north: 1320,
    east: 90,
    address: '松德路 171 號',
    hours: '11:00–20:30',
    dishes: ['船麵', '打拋豬', '青木瓜沙拉'],
    blurb: '湯麵清爽，辣可以只加一匙。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r15',
    name: '蔬食日常',
    cuisine: '素食',
    tags: ['素食', '熱食', '親民'],
    rating: 4.3,
    reviews: 412,
    priceLevel: 2,
    priceLabel: 'NT$180–300',
    eta: '20–30 分',
    fee: 35,
    north: -220,
    east: 1100,
    address: '虎林街 88 號',
    hours: '11:00–20:00',
    dishes: ['蔬食便當', '麻婆豆腐', '濃湯'],
    blurb: '便當附熱湯，不含五辛可備註。',
    promo: '',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=60',
  },
  {
    id: 'r16',
    name: '炸雞研究所',
    cuisine: '美式',
    tags: ['美式'],
    rating: 4.1,
    reviews: 990,
    priceLevel: 3,
    priceLabel: 'NT$280–420',
    eta: '20–35 分',
    fee: 39,
    north: 700,
    east: -1100,
    address: '信義路四段 456 號',
    hours: '12:00–22:00',
    dishes: ['脆皮炸雞', '薯條', '可樂'],
    blurb: '油炸為主，和「不要油炸」的紀錄不合。',
    promo: '滿 $300 折 $30',
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=60',
  },
]

const CUISINE_ORDER = ['日式', '中式', '韓式', '美式', '火鍋', '東南亞', '素食', '咖啡', '甜點']

export const cuisineFilters = ['全部', '符合偏好', ...CUISINE_ORDER]

export function offsetLatLng(origin, northM, eastM) {
  const lat = origin.lat + northM / 111320
  const lng = origin.lng + eastM / (111320 * Math.cos((origin.lat * Math.PI) / 180))
  return { lat, lng }
}

export function distanceMeters(a, b) {
  const R = 6371000
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function formatDistance(meters) {
  if (meters < 950) return `${Math.max(10, Math.round(meters / 10) * 10)} 公尺`
  return `${(meters / 1000).toFixed(1)} 公里`
}

export function formatFee(fee) {
  return fee === 0 ? '免外送費' : `外送費 $${fee}`
}

export function locateRestaurants(origin) {
  return restaurants
    .map((restaurant) => {
      const point = offsetLatLng(origin, restaurant.north, restaurant.east)
      return {
        ...restaurant,
        ...point,
        distance: distanceMeters(origin, point),
      }
    })
    .sort((a, b) => a.distance - b.distance)
}

export function recordMatches(restaurant, record) {
  return record.tags.some((tag) => {
    if (tag === '親民') return restaurant.priceLevel <= 2
    return restaurant.cuisine === tag || restaurant.tags.includes(tag)
  })
}

export function preferenceReasons(restaurant) {
  return preferenceRecords
    .filter((record) => recordMatches(restaurant, record))
    .map((record) => record.summary)
}

export function matchesPreference(restaurant) {
  return preferenceReasons(restaurant).length > 0
}
