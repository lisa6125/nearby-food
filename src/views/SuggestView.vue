<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import StepDots from '../components/StepDots.vue'
import { loadMealDraft, mealLandmarkName } from '../data/mealInput'
import { loadSuggestions } from '../data/suggestionApi'

const router = useRouter()
const draft = loadMealDraft()
const list = loadSuggestions(draft)
const index = ref(0)
const suggestion = computed(() => list[index.value])
const landmark = mealLandmarkName(draft.landmarkId)
const remaining = computed(() => Math.max(list.length - 1 - index.value, 0))

const nutrients = [
  { key: 'energy_kcal', label: '熱量', unit: '大卡' },
  { key: 'protein_g', label: '蛋白質', unit: '克' },
  { key: 'fat_g', label: '脂肪', unit: '克' },
  { key: 'saturated_fat_g', label: '飽和脂肪', unit: '克' },
  { key: 'carbohydrate_g', label: '碳水', unit: '克' },
  { key: 'sodium_mg', label: '鈉', unit: '毫克' },
]

const meal = computed(() => suggestion.value.meal_set)
const store = computed(() => suggestion.value.store)
const matched = computed(() => suggestion.value.match === 'matched')

const contained = computed(() =>
  meal.value.items
    .map((item) => (item.portion ? `${item.name}（${item.portion}）` : item.name))
    .join('、'),
)

const hours = computed(() =>
  (store.value.hours_today || [])
    .map((span) => `${span.open}–${span.close}`)
    .join('、'),
)

function shortDate(value) {
  if (typeof value !== 'string' || value.length < 10) return ''
  return value.slice(5, 10).replace('-', '/')
}

function percent(key) {
  const ratio = suggestion.value.nutrition_compare?.[key]
  if (typeof ratio !== 'number') return null
  return Math.round(ratio * 100)
}

function swap() {
  if (list.length < 2) return
  index.value = (index.value + 1) % list.length
}

function accept() {
  router.push({ name: 'accepted' })
}
</script>

<template>
  <main class="suggest">
    <header class="hero">
      <StepDots :current="1" />
      <h1>這一份給你</h1>
      <p class="remain">這一輪還可以換 {{ remaining }} 份。</p>
    </header>

    <section class="sheet">
      <article class="card">
        <p v-if="matched" class="badge">符合今天想吃的</p>
        <h2>{{ meal.name }}</h2>
        <p class="meta">
          {{ store.name }} · 距離 {{ store.distance_m }} 公尺（從 {{ landmark }} 直線計算）
        </p>
        <div class="price-row">
          <p class="price">{{ meal.price }} 元</p>
          <p class="meta">內含：{{ contained }}</p>
        </div>
        <p class="reason">{{ suggestion.reason.text }}</p>
        <h3>營養（占單餐參考值）</h3>
        <div class="nutrition">
          <div v-for="item in nutrients" :key="item.key" class="nutrient">
            <p>{{ item.label }}</p>
            <p class="amount">{{ meal.nutrition[item.key] }} {{ item.unit }}</p>
            <p class="ratio" :class="{ over: percent(item.key) > 100 }">
              {{ percent(item.key) }}%
            </p>
          </div>
        </div>
        <p class="meta">
          主要食材：{{ meal.ingredients.join('、') }} · 口味：{{ meal.taste_tags.join('、') }}
        </p>
        <p class="meta">
          公告營業時間 {{ hours }}（來源：{{ store.source_label }}），查核於
          {{ shortDate(store.hours_checked_at) }}，不保證當下營業
        </p>
        <p class="meta">
          資料來源：{{ meal.source_label }}，查核於 {{ shortDate(meal.checked_at) }}
        </p>
      </article>

      <div class="actions">
        <button type="button" class="swap" :disabled="list.length < 2" @click="swap">換一份</button>
        <button type="button" class="accept" @click="accept">接受</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.suggest {
  min-height: 100vh;
  background: #f6c945;
}

.hero,
.sheet {
  max-width: 760px;
  margin: 0 auto;
}

.hero {
  padding: 28px 20px 28px;
}

h1 {
  margin-top: 6px;
  font-size: 40px;
  line-height: 1.05;
}

.remain {
  margin-top: 8px;
  font-weight: 700;
}

.sheet {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 210px);
  padding: 22px 20px 120px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.card {
  border: 1.5px solid #ececec;
  border-radius: 28px;
  padding: 18px;
}

.badge {
  display: inline-block;
  margin-bottom: 12px;
  border-radius: 999px;
  background: #f6c945;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 800;
}

h2 {
  font-size: 28px;
  line-height: 1.2;
}

h3 {
  margin-top: 16px;
  font-size: 14px;
}

.meta {
  margin-top: 8px;
  color: #6f6f6f;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.price-row .meta {
  margin-top: 0;
  text-align: right;
}

.price {
  font-size: 28px;
  font-weight: 800;
}

.reason {
  margin-top: 14px;
  border-radius: 18px;
  background: #fff6d0;
  padding: 14px 16px;
  font-weight: 700;
  line-height: 1.5;
}

.nutrition {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.nutrient {
  border-radius: 16px;
  background: #f6f6f6;
  padding: 12px;
}

.nutrient p {
  font-size: 13px;
  font-weight: 700;
}

.nutrient .amount {
  margin-top: 6px;
  font-size: 18px;
  font-weight: 800;
}

.nutrient .ratio {
  margin-top: 2px;
  color: #6f6f6f;
  font-size: 13px;
  font-weight: 800;
}

.ratio.over {
  color: #d92d20;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 22px;
}

.swap,
.accept {
  flex: 1;
  border-radius: 999px;
  padding: 16px;
  font-size: 16px;
  font-weight: 800;
}

.swap {
  border: 1.5px solid #1c1c1c;
  background: #fff;
  color: #1c1c1c;
  cursor: pointer;
}

.swap:disabled {
  border-color: #d9d9d9;
  background: #f3f3f3;
  color: #8d8d8d;
  cursor: default;
}

.accept {
  border: 0;
  background: #1c1c1c;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 640px) {
  h1 {
    font-size: 34px;
  }

  h2,
  .price {
    font-size: 24px;
  }
}
</style>
