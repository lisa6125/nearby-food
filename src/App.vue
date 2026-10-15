<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <router-view />
  <nav class="tabbar" aria-label="主要導覽">
    <router-link to="/" :class="{ on: route.name === 'home' }">首頁</router-link>
    <router-link to="/search" :class="{ on: route.name === 'search' }">搜尋</router-link>
    <router-link to="/random" :class="{ on: route.name === 'random' }">隨機</router-link>
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
