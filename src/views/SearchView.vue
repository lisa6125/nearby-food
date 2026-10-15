<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterChipRow from '../components/FilterChipRow.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantMap from '../components/RestaurantMap.vue'
import { useLocation } from '../composables/useLocation'
import {
  cuisineFilters,
  locateRestaurants,
  matchesPreference,
  preferenceRecords,
  recordMatches,
} from '../data/mock'

const route = useRoute()
const router = useRouter()
const { position, status, locate } = useLocation()

const keyword = ref('')
const queries = ref([])
const cuisine = ref('全部')
const sortBy = ref('distance')
const selectedId = ref('')
const mode = ref('list')

const located = computed(() => locateRestaurants(position.value))

const activeRecord = computed(() =>
  preferenceRecords.find((record) => record.id === route.query.pref),
)

watch(
  activeRecord,
  (record) => {
    if (record) cuisine.value = '符合偏好'
  },
  { immediate: true },
)

const filterChips = computed(() => {
  const categories = cuisineFilters.map((item) => ({
    id: `c:${item}`,
    kind: 'cuisine',
    label: item,
    value: item,
    active: cuisine.value === item,
  }))
  const activeCategory = categories.filter((chip) => chip.active)
  const otherCategories = categories.filter((chip) => !chip.active)

  return [
    ...queries.value.map((query) => ({
      id: `q:${query}`,
      kind: 'query',
      label: query,
      value: query,
      active: true,
    })),
    ...activeCategory,
    ...otherCategories,
  ]
})

function addQuery() {
  const text = keyword.value.trim()
  keyword.value = ''
  if (!text) return
  const exists = queries.value.some((query) => query.toLowerCase() === text.toLowerCase())
  if (exists) return
  queries.value = [text, ...queries.value]
}

function selectChip(chip) {
  if (chip.kind === 'cuisine') cuisine.value = chip.value
}

function removeChip(chip) {
  queries.value = queries.value.filter((query) => query !== chip.value)
}

const visible = computed(() => {
  const tokens = queries.value.map((query) => query.toLowerCase())
  let list = located.value.filter((restaurant) => {
    const text = [restaurant.name, restaurant.cuisine, restaurant.address, ...restaurant.dishes, ...restaurant.tags]
      .join(' ')
      .toLowerCase()
    if (tokens.some((token) => !text.includes(token))) return false
    if (cuisine.value === '符合偏好') {
      if (activeRecord.value) return recordMatches(restaurant, activeRecord.value)
      return matchesPreference(restaurant)
    }
    if (cuisine.value !== '全部' && restaurant.cuisine !== cuisine.value) return false
    return true
  })

  if (sortBy.value === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating || a.distance - b.distance)
  } else if (sortBy.value === 'price') {
    list = [...list].sort((a, b) => a.priceLevel - b.priceLevel || a.distance - b.distance)
  }

  return list
})

watch(visible, (list) => {
  if (!list.some((item) => item.id === selectedId.value)) selectedId.value = ''
})

function selectRestaurant(id) {
  selectedId.value = selectedId.value === id ? '' : id
}

function clearPreference() {
  router.replace({ name: 'search' })
  cuisine.value = '全部'
}

const locationText = computed(() => {
  if (status.value === 'locating') return '定位中'
  return position.value.label
})
</script>

<template>
  <div class="search-page">
    <header class="top">
      <div class="search-row">
        <button type="button" class="icon-btn" @click="router.push({ name: 'home' })" aria-label="回首頁">‹</button>
        <form class="search" @submit.prevent="addQuery">
          <span class="sr">搜尋餐廳、料理或分類</span>
          <input v-model="keyword" type="search" placeholder="搜尋後按 Enter 加入條件" />
        </form>
        <button type="button" class="locate" @click="locate">{{ locationText }}</button>
      </div>
    </header>

    <div class="sheet">
      <FilterChipRow :chips="filterChips" @select="selectChip" @remove="removeChip" />

      <div class="tools">
        <div class="sorts">
          <button type="button" :class="{ on: sortBy === 'distance' }" @click="sortBy = 'distance'">距離</button>
          <button type="button" :class="{ on: sortBy === 'rating' }" @click="sortBy = 'rating'">評分</button>
          <button type="button" :class="{ on: sortBy === 'price' }" @click="sortBy = 'price'">價格</button>
        </div>
        <div class="modes">
          <button type="button" :class="{ on: mode === 'list' }" @click="mode = 'list'">清單</button>
          <button type="button" :class="{ on: mode === 'map' }" @click="mode = 'map'">地圖</button>
        </div>
      </div>

      <p v-if="activeRecord" class="pref-banner">
        依偏好紀錄篩選：{{ activeRecord.summary }}
        <button type="button" @click="clearPreference">清除</button>
      </p>

    <div class="layout" :class="mode">
      <section class="list-panel">
        <p class="count">{{ visible.length }} 間餐廳 · 資料為 mock</p>
        <p v-if="visible.length === 0" class="empty">沒有符合的餐廳，換個關鍵字或分類。</p>
        <RestaurantCard
          v-for="restaurant in visible"
          :key="restaurant.id"
          :restaurant="restaurant"
          :active="restaurant.id === selectedId"
          @select="selectRestaurant"
        />
      </section>
      <aside class="map-panel">
        <RestaurantMap
          :restaurants="visible"
          :origin="position"
          :selected-id="selectedId"
          :active="mode === 'map'"
          @select="selectRestaurant"
        />
      </aside>
    </div>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f6c945;
}

.top {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 16px 16px 20px;
  background: #f6c945;
}

.sheet {
  min-height: calc(100vh - 88px);
  padding: 8px 0 112px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.search-row,
.tools,
.sorts,
.modes,
.pref-banner {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-row {
  align-items: stretch;
}

.icon-btn,
.locate,
.sorts button,
.modes button,
.pref-banner button {
  border: 0;
  background: #fff;
  cursor: pointer;
}

.icon-btn,
.locate {
  border-radius: 999px;
  font-weight: 800;
  white-space: nowrap;
}

.icon-btn {
  width: 44px;
  height: 44px;
  font-size: 28px;
  line-height: 1;
}

.locate {
  max-width: 128px;
  padding: 0 14px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search {
  flex: 1;
}

.search input {
  width: 100%;
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  font-weight: 700;
}

.search input::placeholder {
  color: #9a9a9a;
  font-weight: 700;
}

.sheet :deep(.chip-bar) {
  margin: 8px 16px 0;
}

.sorts button,
.modes button {
  border-radius: 999px;
  padding: 8px 14px;
  background: #f3f3f3;
  font-weight: 800;
  white-space: nowrap;
}

.sorts button.on,
.modes button.on {
  background: #1c1c1c;
  color: #fff;
}

.tools {
  justify-content: space-between;
  margin: 12px 16px 0;
}

.pref-banner {
  margin: 10px 16px 0;
  color: #7a5b00;
  font-size: 14px;
  font-weight: 800;
}

.pref-banner button {
  background: transparent;
  color: #111;
  text-decoration: underline;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 42vw);
  min-height: calc(100vh - 132px);
}

.list-panel {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 18px;
  align-content: start;
  padding: 16px 16px 32px;
}

.count,
.empty {
  grid-column: 1 / -1;
}

.count,
.empty {
  margin: 0 0 12px;
  color: #666;
  font-size: 14px;
}

.map-panel {
  position: sticky;
  top: 92px;
  height: calc(100vh - 120px);
  margin: 16px 16px 0 0;
  overflow: hidden;
  border-radius: 28px;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .layout.list .map-panel,
  .layout.map .list-panel {
    display: none;
  }

  .map-panel {
    position: relative;
    top: 0;
    height: calc(100vh - 210px);
    margin: 16px;
  }
}

@media (min-width: 861px) {
  .modes {
    display: none;
  }
}
</style>
