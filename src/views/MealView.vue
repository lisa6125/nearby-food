<script setup>
import { Locate } from '@lucide/vue'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import StepDots from '../components/StepDots.vue'
import { requestUserLocation } from '../composables/useLocation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BUDGETS,
  CURRENT_LOCATION_ID,
  DISTANCES,
  INGREDIENTS,
  LANDMARKS,
  TASTES,
  TEXT_LIMIT,
  loadMealDraft,
  mealLandmarkName,
  saveMealDraft,
  termList,
} from '../data/mealInput'

const router = useRouter()
const draft = reactive(loadMealDraft())
const locating = ref(false)
const tasteOpen = ref(false)
const tasteInput = ref('')
const customTastes = ref(draft.tastes.filter((taste) => !TASTES.includes(taste)))
const UNSET = 'none'
const TASTE_LIMIT = 20

const landmarkName = computed(() => mealLandmarkName(draft.landmarkId))
const textCount = computed(() => draft.text.length)
const tasteOptions = computed(() => [...TASTES, ...customTastes.value])
const budgetValue = computed({
  get: () => (draft.budget == null || draft.budget === '' ? UNSET : String(draft.budget)),
  set: (value) => {
    draft.budget = value === UNSET ? null : Number(value)
  },
})
const avoidValue = computed({
  get: () => draft.avoid || UNSET,
  set: (value) => {
    draft.avoid = value === UNSET ? '' : value
  },
})

function selectLandmark(id) {
  draft.landmarkId = id
  draft.origin = null
}

function openLocationUnavailable() {
  draft.origin = null
  if (!LANDMARKS.some((item) => item.id === draft.landmarkId)) {
    draft.landmarkId = LANDMARKS[0].id
  }
  saveMealDraft({
    landmarkId: draft.landmarkId,
    origin: null,
    budget: draft.budget === '' || draft.budget === null ? null : Number(draft.budget),
    avoid: draft.avoid || null,
    radius: draft.radius,
    tastes: [...draft.tastes],
    text: draft.text.trim(),
    exclusions: termList(draft.exclusions),
    lessPreferred: termList(draft.lessPreferred),
    confirmed: false,
  })
  router.push({ name: 'location-unavailable' })
}

async function useCurrentLocation() {
  if (locating.value) return
  locating.value = true
  try {
    draft.origin = await requestUserLocation()
    draft.landmarkId = CURRENT_LOCATION_ID
  } catch {
    openLocationUnavailable()
  } finally {
    locating.value = false
  }
}

function selectDistance(radius) {
  draft.radius = radius
}

function toggleTaste(taste) {
  if (draft.tastes.includes(taste)) {
    draft.tastes = draft.tastes.filter((item) => item !== taste)
    return
  }
  draft.tastes = [...draft.tastes, taste]
}

function openTasteDialog() {
  tasteInput.value = ''
  tasteOpen.value = true
}

function addTaste() {
  const taste = tasteInput.value.trim().slice(0, TASTE_LIMIT)
  if (!taste) return
  if (!TASTES.includes(taste) && !customTastes.value.includes(taste)) {
    customTastes.value = [...customTastes.value, taste]
  }
  if (!draft.tastes.includes(taste)) {
    draft.tastes = [...draft.tastes, taste]
  }
  tasteInput.value = ''
  tasteOpen.value = false
}

function onTextInput(event) {
  draft.text = event.target.value.slice(0, TEXT_LIMIT)
}

function submit() {
  if (draft.landmarkId === CURRENT_LOCATION_ID && !draft.origin) {
    openLocationUnavailable()
    return
  }
  saveMealDraft({
    landmarkId: draft.landmarkId,
    origin: draft.landmarkId === CURRENT_LOCATION_ID ? { ...draft.origin } : null,
    budget: draft.budget === '' || draft.budget === null ? null : Number(draft.budget),
    avoid: draft.avoid || null,
    radius: draft.radius,
    tastes: [...draft.tastes],
    text: draft.text.trim(),
    exclusions: [],
    lessPreferred: [],
    confirmed: false,
  })
  router.push({ name: 'suggest' })
}
</script>

<template>
  <main class="meal">
    <header class="hero">
      <StepDots :current="0" />
      <p class="brand">SmartMeal</p>
      <h1>今晚吃什麼</h1>
      <p class="lead">勾一勾、或補一句話，系統幫你挑一份。</p>
    </header>

    <form class="sheet" @submit.prevent="submit">
      <section>
        <h2>從哪裡出發</h2>
        <div class="chips">
          <button
            v-for="landmark in LANDMARKS"
            :key="landmark.id"
            type="button"
            class="chip"
            :class="{ on: draft.landmarkId === landmark.id }"
            @click="selectLandmark(landmark.id)"
          >
            {{ landmark.name }}
          </button>
        </div>
        <button
          type="button"
          class="locate"
          :class="{ on: draft.landmarkId === CURRENT_LOCATION_ID }"
          :disabled="locating"
          @click="useCurrentLocation"
        >
          <Locate :size="16" aria-hidden="true" />
          {{ locating ? '定位中' : '目前位置' }}
        </button>
        <p class="note">距離從 {{ landmarkName }} 計算。上次選的地標會先帶出來。</p>
      </section>

      <section>
        <h2>這次的條件</h2>
        <div class="card">
          <div class="row">
            <span id="budget-label">預算</span>
            <Select v-model="budgetValue">
              <SelectTrigger class="meal-select" aria-labelledby="budget-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem
                  v-for="item in BUDGETS"
                  :key="item.label"
                  :value="item.value == null ? UNSET : String(item.value)"
                >
                  {{ item.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="row">
            <span id="avoid-label">忌口</span>
            <Select v-model="avoidValue">
              <SelectTrigger class="meal-select" aria-labelledby="avoid-label">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem :value="UNSET">沒有</SelectItem>
                <SelectItem v-for="item in INGREDIENTS" :key="item" :value="item">
                  {{ item }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="row distances">
            <span>搜尋距離</span>
            <div class="chips">
              <button
                v-for="radius in DISTANCES"
                :key="radius"
                type="button"
                class="chip"
                :class="{ on: draft.radius === radius }"
                @click="selectDistance(radius)"
              >
                {{ radius }}
              </button>
              <span class="unit">公尺</span>
            </div>
          </div>
        </div>
        <p class="note">預設值來自個人設定，這裡改只影響這一次。</p>
      </section>

      <section>
        <h2>今天想吃（可以不選）</h2>
        <div class="chips">
          <button
            v-for="taste in tasteOptions"
            :key="taste"
            type="button"
            class="chip"
            :class="{ on: draft.tastes.includes(taste) }"
            @click="toggleTaste(taste)"
          >
            {{ taste }}
          </button>
          <button type="button" class="chip more" @click="openTasteDialog">＋ 更多</button>
        </div>
        <Dialog v-model:open="tasteOpen">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新增條件</DialogTitle>
              <DialogDescription>輸入今天想吃的，會加到條件裡。</DialogDescription>
            </DialogHeader>
            <form class="taste-form" @submit.prevent="addTaste">
              <input
                v-model="tasteInput"
                type="text"
                :maxlength="TASTE_LIMIT"
                placeholder="例如：炸物"
                aria-label="新的條件"
              />
              <DialogFooter>
                <button type="button" class="taste-cancel" @click="tasteOpen = false">取消</button>
                <button type="submit" class="taste-add" :disabled="!tasteInput.trim()">加入</button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </section>

      <section>
        <h2>補一句話（可以不寫）</h2>
        <label class="text">
          <textarea
            :value="draft.text"
            rows="2"
            :maxlength="TEXT_LIMIT"
            @input="onTextInput"
          ></textarea>
          <span>{{ textCount }} / {{ TEXT_LIMIT }}</span>
        </label>
        <p class="note">不要寫姓名、電話或地址等個人資料。</p>
      </section>

      <button type="submit" class="submit">整理條件</button>
    </form>
  </main>
</template>

<style scoped>
.meal {
  min-height: 100vh;
  background: #f6c945;
}

.hero,
.sheet {
  max-width: 760px;
  margin: 0 auto;
}

.hero {
  padding: 28px 20px 36px;
}

.brand {
  font-weight: 800;
}

h1 {
  margin-top: 6px;
  font-size: 40px;
  line-height: 1.05;
}

.lead {
  margin-top: 8px;
  font-weight: 700;
}

.sheet {
  min-height: calc(100vh - 180px);
  padding: 22px 20px 112px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

section + section {
  margin-top: 26px;
}

h2 {
  margin-bottom: 12px;
  font-size: 18px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.chip,
.locate {
  border: 1.5px solid transparent;
  border-radius: 999px;
  background: #f3f3f3;
  padding: 8px 14px;
  font-weight: 800;
  cursor: pointer;
}

.chip.on,
.locate.on {
  background: #1c1c1c;
  color: #fff;
}

.locate,
.chip.more {
  margin-top: 10px;
  background: #fff;
  border-color: #1c1c1c;
}

.locate {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.chip.more {
  margin-top: 0;
}

.taste-form {
  display: grid;
  gap: 16px;
}

.taste-form input {
  width: 100%;
  border: 0;
  border-radius: 18px;
  background: #f3f3f3;
  padding: 14px 16px;
  font-weight: 700;
}

.taste-cancel,
.taste-add {
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 800;
  cursor: pointer;
}

.taste-cancel {
  border: 1.5px solid #1c1c1c;
  background: #fff;
}

.taste-add {
  border: 0;
  background: #1c1c1c;
  color: #fff;
}

.taste-add:disabled {
  cursor: default;
  opacity: 0.4;
}

.note {
  margin-top: 10px;
  color: #8d8d8d;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
}

.locate:disabled {
  cursor: wait;
}

.card {
  border: 1.5px solid #ececec;
  border-radius: 22px;
  padding: 6px 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 52px;
}

.row + .row {
  border-top: 1px solid #f0f0f0;
}

.row span,
.unit {
  font-weight: 800;
}

.meal-select {
  height: auto;
  width: auto;
  gap: 4px;
  border: 0;
  background: transparent;
  padding: 0;
  font-weight: 800;
  box-shadow: none;
}

.distances {
  align-items: flex-start;
  padding: 12px 0;
}

.distances .chips {
  justify-content: flex-end;
}

.text {
  display: block;
  position: relative;
}

textarea {
  width: 100%;
  resize: none;
  border: 0;
  border-radius: 18px;
  background: #f3f3f3;
  padding: 16px 16px 32px;
  font-weight: 700;
}

.text span {
  position: absolute;
  right: 14px;
  bottom: 10px;
  color: #8d8d8d;
  font-size: 12px;
  font-weight: 800;
}

.submit {
  width: 100%;
  margin-top: 22px;
  border: 0;
  border-radius: 999px;
  background: #1c1c1c;
  color: #fff;
  padding: 16px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 640px) {
  h1 {
    font-size: 34px;
  }
}
</style>
