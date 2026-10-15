<script setup>
import { useRouter } from 'vue-router'
import { preferenceRecords } from '../data/mock'
import { useLocation } from '../composables/useLocation'

const router = useRouter()
const { position, status, locate } = useLocation()

const statusText = {
  idle: '準備定位',
  locating: '正在取得你的位置',
  ready: '已使用目前位置',
  denied: '無法定位，改用台北市信義區',
  unsupported: '這台裝置沒有定位，改用台北市信義區',
}

function openRecord(record) {
  router.push({ name: 'search', query: { pref: record.id } })
}
</script>

<template>
  <main class="home">
    <header class="hero">
      <p class="brand">覓食</p>
      <h1>附近吃什麼</h1>
      <p class="lead">先找餐廳，也把你說過的口味記下來。</p>
      <p class="location">
        <span>{{ statusText[status] }}</span>
        <span v-if="position.label"> · {{ position.label }}</span>
        <button type="button" @click="locate">重新定位</button>
      </p>
    </header>

    <section class="sheet">
      <div class="actions">
        <button type="button" class="action" @click="router.push({ name: 'search' })">
          <span class="kicker">搜尋</span>
          <strong>進入搜索頁</strong>
          <span>清單、分類與地圖</span>
        </button>
        <button type="button" class="action dark" @click="router.push({ name: 'random' })">
          <span class="kicker">隨機</span>
          <strong>附近擲五家</strong>
          <span>骰子選出五筆餐廳</span>
        </button>
      </div>

      <div class="section-title">
        <h2>個人偏好 AI 紀錄</h2>
        <span>原型</span>
      </div>
      <button
        v-for="record in preferenceRecords"
        :key="record.id"
        type="button"
        class="record"
        @click="openRecord(record)"
      >
        <time>{{ record.at }}</time>
        <strong>{{ record.summary }}</strong>
        <span>{{ record.detail }}</span>
      </button>
    </section>
  </main>
</template>

<style scoped>
.home {
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

.lead,
.location {
  margin-top: 8px;
  color: #3d3420;
  font-weight: 700;
}

.location {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 14px;
}

.location button {
  border: 0;
  padding: 0;
  background: transparent;
  color: #1c1c1c;
  font-weight: 800;
  text-decoration: underline;
  cursor: pointer;
}

.sheet {
  min-height: calc(100vh - 180px);
  padding: 22px 20px 112px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.action {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-height: 148px;
  padding: 18px;
  border: 0;
  border-radius: 24px;
  background: #f6c945;
  color: #1c1c1c;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(70, 50, 0, 0.08);
}

.action.dark {
  background: #1c1c1c;
  color: #fff;
}

.action strong {
  font-size: 22px;
}

.action span,
.kicker {
  font-size: 13px;
  font-weight: 700;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 28px;
}

.section-title h2 {
  font-size: 20px;
}

.section-title span,
.record time,
.record span {
  color: #8d8d8d;
  font-size: 13px;
  font-weight: 700;
}

.record {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  margin-top: 10px;
  padding: 16px;
  border: 0;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(70, 50, 0, 0.08);
  text-align: left;
  cursor: pointer;
}

.record strong {
  font-size: 16px;
}

@media (max-width: 640px) {
  h1 {
    font-size: 34px;
  }

  .action {
    min-height: 132px;
    padding: 14px;
  }

  .action strong {
    font-size: 18px;
  }
}
</style>
