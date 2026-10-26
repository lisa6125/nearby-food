<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EatenPromptDialog from './components/EatenPromptDialog.vue'
import { loadPendingMeal } from './data/eatenRecord'

const route = useRoute()
const router = useRouter()
const pending = ref(null)
const promptOpen = ref(false)
const onMeal = computed(() =>
  ['meal', 'location-unavailable', 'suggest', 'accepted'].includes(route.name),
)

onMounted(() => {
  pending.value = loadPendingMeal()
  promptOpen.value = Boolean(pending.value)
})

function finishRecord() {
  promptOpen.value = false
  pending.value = null
  router.push({ name: 'home' })
}
</script>

<template>
  <router-view />
  <EatenPromptDialog
    v-if="pending"
    v-model:open="promptOpen"
    :pending="pending"
    @submitted="finishRecord"
  />
  <nav class="tabbar" aria-label="主要導覽">
    <router-link to="/" :class="{ on: route.name === 'home' }">首頁</router-link>
    <router-link
      to="/meal"
      :class="{ on: onMeal }"
      :aria-current="onMeal ? 'page' : undefined"
    >
      選餐
    </router-link>
    <router-link to="/review" :class="{ on: route.name === 'review' }">回顧</router-link>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 50%;
  bottom: 18px;
  z-index: 800;
  display: flex;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(70, 50, 0, 0.16);
  transform: translateX(-50%);
}

.tabbar a {
  min-width: 72px;
  padding: 10px 14px;
  border-radius: 999px;
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
}

.tabbar a.on {
  background: #f6c945;
}
</style>
