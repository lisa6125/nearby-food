<script setup>
import { Check } from '@lucide/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StepDots from '../components/StepDots.vue'
import { LANDMARKS, loadMealDraft, saveMealDraft } from '../data/mealInput'

const router = useRouter()
const draft = loadMealDraft()
const selectedId = ref(
  LANDMARKS.some((item) => item.id === draft.landmarkId) ? draft.landmarkId : LANDMARKS[0].id,
)

function useLandmark() {
  saveMealDraft({
    ...draft,
    landmarkId: selectedId.value,
    origin: null,
    tastes: [...draft.tastes],
  })
  router.push({ name: 'meal' })
}
</script>

<template>
  <main class="locate-page">
    <header class="hero">
      <StepDots :current="0" />
      <p class="brand">SmartMeal</p>
      <h1>從哪裡出發</h1>
    </header>

    <section class="sheet">
      <div class="alert" role="status">
        <p class="alert-title">定位不可用</p>
        <p>無法取得目前的位置，可以從清單選擇一個地標。</p>
      </div>

      <h2>選一個地標</h2>
      <div class="list" role="radiogroup" aria-label="選一個地標">
        <button
          v-for="landmark in LANDMARKS"
          :key="landmark.id"
          type="button"
          class="landmark"
          :class="{ on: selectedId === landmark.id }"
          role="radio"
          :aria-checked="selectedId === landmark.id"
          @click="selectedId = landmark.id"
        >
          <span class="copy">
            <strong>{{ landmark.name }}</strong>
            <small>{{ landmark.description }}</small>
          </span>
          <span v-if="selectedId === landmark.id" class="check" aria-hidden="true">
            <Check :size="16" :stroke-width="3" />
          </span>
          <span v-else class="pick">選擇</span>
        </button>
      </div>
      <p class="note">距離一律從你選的地標直線計算，不是從你現在的位置。</p>
      <button type="button" class="submit" @click="useLandmark">用這個地標</button>
    </section>
  </main>
</template>

<style scoped>
.locate-page {
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

.sheet {
  min-height: calc(100vh - 180px);
  padding: 22px 20px 112px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.alert {
  border-radius: 18px;
  background: #fff6d0;
  padding: 16px 18px;
}

.alert-title {
  font-weight: 800;
}

.alert p + p {
  margin-top: 6px;
  font-weight: 700;
  line-height: 1.5;
}

h2 {
  margin: 22px 0 12px;
  font-size: 18px;
}

.list {
  border: 1.5px solid #ececec;
  border-radius: 22px;
  overflow: hidden;
}

.landmark {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 0;
  background: #fff;
  padding: 16px;
  text-align: left;
  cursor: pointer;
}

.landmark + .landmark {
  border-top: 1px solid #f0f0f0;
}

.copy {
  display: grid;
  gap: 4px;
}

.copy strong {
  font-size: 16px;
}

.copy small {
  color: #8d8d8d;
  font-weight: 700;
}

.check {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 999px;
  background: #1c1c1c;
  color: #fff;
}

.pick {
  border-radius: 999px;
  background: #f3f3f3;
  padding: 8px 14px;
  color: #8d8d8d;
  font-weight: 800;
}

.note {
  margin-top: 12px;
  color: #8d8d8d;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.5;
}

.submit {
  width: 100%;
  margin-top: 18px;
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
