<script setup>
import { computed } from 'vue';
import StepDots from '../components/StepDots.vue';
import { BUDGETS, loadMealDraft, mealLandmarkName } from '../data/mealInput';

const draft = loadMealDraft();
const landmarkName = computed(() => mealLandmarkName(draft.landmarkId));
const budgetLabel = computed(
  () => BUDGETS.find((item) => item.value === draft.budget)?.label || '不限',
);
</script>

<template>
  <main class="confirm">
    <header class="hero">
      <StepDots :current="1" />
      <h1>這樣理解對嗎？</h1>
      <p class="lead">確認之後才會開始推薦。</p>
    </header>
    <section class="sheet">
      <p>
        {{ budgetLabel }} · 忌口 {{ draft.avoid || '沒有' }} ·
        {{ draft.radius }} 公尺
      </p>
      <p>從 {{ landmarkName }} 出發</p>
      <p v-if="draft.tastes.length">今天想吃 {{ draft.tastes.join('、') }}</p>
      <p v-else>今天想吃可以不選</p>
      <p v-if="draft.text">「{{ draft.text }}」</p>
    </section>
  </main>
</template>

<style scoped>
.confirm {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f6c945;
}

.hero {
  padding: 22px 22px 28px;
}

h1 {
  font-size: 32px;
  line-height: 1.15;
}

.lead,
.sheet p {
  margin-top: 8px;
  font-weight: 700;
}

.sheet {
  min-height: calc(100vh - 180px);
  padding: 22px 18px 128px;
  border-radius: 28px 28px 0 0;
  background: #fff;
}
</style>
