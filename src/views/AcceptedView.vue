<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import StepDots from '../components/StepDots.vue'
import {
  loadAcceptedSelection,
  mapsSearchUrl,
  rememberNavigation,
} from '../data/eatenRecord'

const selection = loadAcceptedSelection()
const meal = computed(() => selection?.suggestion?.meal_set || null)
const store = computed(() => selection?.suggestion?.store || null)
const remembered = ref(false)

function openMaps() {
  if (!selection || !store.value) return
  rememberNavigation(selection)
  remembered.value = true
  window.open(mapsSearchUrl(store.value.name, store.value.address), '_blank', 'noopener')
}
</script>

<template>
  <main class="accepted">
    <header class="hero">
      <StepDots :current="2" />
      <p class="brand">SmartMeal</p>
      <h1>就吃這一份</h1>
    </header>

    <section v-if="meal && store" class="sheet">
      <article class="card">
        <h2>{{ meal.name }}</h2>
        <p class="meta">
          {{ store.name }} · {{ store.address }} · {{ store.distance_m }} 公尺
        </p>
        <button type="button" class="nav" @click="openMaps">開啟導航</button>
        <p class="fine">實際販售情形與價格以門市現場為準。</p>
      </article>
      <p v-if="remembered" class="later">已記住。離開後回來會問你吃完了嗎。</p>
    </section>

    <section v-else class="sheet">
      <p class="later">先從建議裡接受一份。</p>
      <RouterLink class="back" :to="{ name: 'suggest' }">回到推薦</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.accepted {
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

.brand {
  font-weight: 800;
}

h1 {
  margin-top: 8px;
  font-size: 40px;
  line-height: 1.05;
}

.sheet {
  min-height: calc(100vh - 180px);
  padding: 22px 20px 120px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.card {
  border: 1.5px solid #ececec;
  border-radius: 28px;
  padding: 18px;
}

h2 {
  font-size: 28px;
  line-height: 1.25;
}

.meta,
.fine,
.later {
  margin-top: 8px;
  color: #6f6f6f;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.nav {
  width: 100%;
  margin-top: 16px;
  border: 0;
  border-radius: 999px;
  background: #f6c945;
  padding: 16px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.back {
  display: inline-block;
  margin-top: 16px;
  color: #1c1c1c;
  font-weight: 800;
}

@media (max-width: 640px) {
  h1 {
    font-size: 34px;
  }

  h2 {
    font-size: 24px;
  }
}
</style>
