<script setup>
import StepDots from '../components/StepDots.vue'
</script>

<template>
  <main class="accepted">
    <header class="hero">
      <StepDots :current="2" />
    </header>
    <section class="sheet"></section>
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
  padding: 28px 20px 36px;
}

.sheet {
  min-height: calc(100vh - 140px);
  padding: 22px 20px 112px;
  border-radius: 32px 32px 0 0;
  background: #fff;
}
</style>
