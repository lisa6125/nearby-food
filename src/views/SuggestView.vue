<script setup>
import StepDots from '../components/StepDots.vue'
</script>

<template>
  <main class="suggest">
    <header class="hero">
      <StepDots :current="1" />
      <h1>推薦</h1>
    </header>
    <section class="sheet"></section>
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
  padding: 28px 20px 36px;
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

@media (max-width: 640px) {
  h1 {
    font-size: 34px;
  }
}
</style>
