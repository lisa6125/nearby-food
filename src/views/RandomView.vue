<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantMap from '../components/RestaurantMap.vue'
import { useLocation } from '../composables/useLocation'
import { locateRestaurants } from '../data/mock'

const router = useRouter()
const { position } = useLocation()

const rolling = ref(false)
const face = ref(5)
const picks = ref([])
const selectedId = ref('')
const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

const nearby = computed(() => locateRestaurants(position.value))

let timer = 0

function roll() {
  if (rolling.value) return
  rolling.value = true
  picks.value = []
  selectedId.value = ''
  timer = window.setInterval(() => {
    face.value = Math.floor(Math.random() * faces.length)
  }, 80)

  window.setTimeout(() => {
    window.clearInterval(timer)
    face.value = Math.floor(Math.random() * faces.length)
    const pool = [...nearby.value]
    const next = []
    while (next.length < 5 && pool.length) {
      const index = Math.floor(Math.random() * pool.length)
      next.push(pool.splice(index, 1)[0])
    }
    picks.value = next
    rolling.value = false
  }, 1100)
}
</script>

<template>
  <main class="random-page">
    <header class="hero">
      <h1>隨機附近餐廳</h1>
      <p>骰子會從目前位置附近擲出五筆。</p>
    </header>

    <section class="sheet">
      <button type="button" class="die" :class="{ rolling }" :disabled="rolling" @click="roll">
        <span>{{ faces[face] }}</span>
        <small>{{ rolling ? '擲骰中' : picks.length ? '再擲一次' : '擲出五家' }}</small>
      </button>

      <div v-if="picks.length" class="result">
        <div class="list">
          <h2>這五家</h2>
          <div class="cards">
            <RestaurantCard
              v-for="restaurant in picks"
              :key="restaurant.id"
              :restaurant="restaurant"
              :active="restaurant.id === selectedId"
              @select="selectedId = $event"
            />
          </div>
        </div>
        <div class="map-wrap">
          <RestaurantMap
            :restaurants="picks"
            :origin="position"
            :selected-id="selectedId"
            @select="selectedId = $event"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.random-page {
  min-height: 100vh;
  background: #f6c945;
}

.hero {
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 20px 32px;
}

h1 {
  font-size: 34px;
}

.hero p {
  margin-top: 8px;
  color: #3d3420;
  font-weight: 700;
}

.sheet {
  min-height: calc(100vh - 140px);
  padding: 8px 20px 120px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.die {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 168px;
  height: 168px;
  margin: 20px auto 8px;
  border: 0;
  border-radius: 36px;
  background: #f6c945;
  color: #1c1c1c;
  cursor: pointer;
  box-shadow: 0 16px 32px rgba(70, 50, 0, 0.16);
}

.die span {
  font-size: 72px;
  line-height: 1;
}

.die small {
  margin-top: 4px;
  font-size: 13px;
}

.die.rolling {
  animation: tumble 0.18s linear infinite;
}

.die:disabled {
  cursor: wait;
}

.result {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
  gap: 16px;
  align-items: start;
  max-width: 1080px;
  margin: 12px auto 0;
}

.list h2 {
  margin: 0 0 12px;
  font-size: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.map-wrap {
  position: sticky;
  top: 16px;
  height: 520px;
  overflow: hidden;
  border-radius: 28px;
}

@keyframes tumble {
  0% {
    transform: rotate(-8deg) translateY(0);
  }
  50% {
    transform: rotate(8deg) translateY(-6px);
  }
  100% {
    transform: rotate(-8deg) translateY(0);
  }
}

@media (max-width: 800px) {
  .result {
    grid-template-columns: 1fr;
  }

  .map-wrap {
    position: relative;
    top: 0;
    height: 320px;
  }
}
</style>
