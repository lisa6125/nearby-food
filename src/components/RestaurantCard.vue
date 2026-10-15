<script setup>
import { computed } from 'vue'
import { formatDistance, formatFee, preferenceReasons } from '../data/mock'

const props = defineProps({
  restaurant: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])

const reasons = computed(() => preferenceReasons(props.restaurant))
</script>

<template>
  <article class="card" :class="{ active }" @click="emit('select', restaurant.id)">
    <div class="photo">
      <img :src="restaurant.image" :alt="restaurant.name" />
      <span class="rating">★ {{ restaurant.rating.toFixed(1) }}</span>
      <span v-if="restaurant.promo" class="promo">{{ restaurant.promo }}</span>
    </div>
    <div class="body">
      <h3>{{ restaurant.name }}</h3>
      <p class="meta">{{ restaurant.cuisine }} · {{ formatDistance(restaurant.distance) }}</p>
      <p class="meta">{{ restaurant.priceLabel }} · {{ formatFee(restaurant.fee) }}</p>
      <p v-if="reasons.length" class="match">{{ reasons[0] }}</p>
      <div v-if="active" class="detail">
        <p>{{ restaurant.blurb }}</p>
        <p>{{ restaurant.address }} · {{ restaurant.hours }}</p>
        <ul>
          <li v-for="dish in restaurant.dishes" :key="dish">{{ dish }}</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  cursor: pointer;
  text-align: left;
}

.photo {
  position: relative;
  aspect-ratio: 1.15;
  overflow: hidden;
  border-radius: 22px;
  background: #f3f3f3;
  box-shadow: 0 10px 24px rgba(70, 50, 0, 0.08);
}

.card.active .photo {
  box-shadow: 0 0 0 3px #f6c945, 0 10px 24px rgba(70, 50, 0, 0.08);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rating,
.promo {
  position: absolute;
  border-radius: 999px;
  background: #fff;
  font-size: 12px;
  font-weight: 800;
}

.rating {
  top: 10px;
  left: 10px;
  padding: 4px 8px;
}

.promo {
  left: 10px;
  bottom: 10px;
  padding: 4px 8px;
  background: #f6c945;
}

.body {
  padding: 10px 4px 0;
}

.body h3 {
  font-size: 16px;
}

.meta {
  margin-top: 2px;
  color: #8d8d8d;
  font-size: 13px;
  font-weight: 700;
}

.match {
  display: inline-flex;
  margin-top: 8px;
  padding: 3px 8px;
  border-radius: 999px;
  background: #fff4c2;
  color: #7a5b00;
  font-size: 12px;
  font-weight: 800;
}

.detail p {
  margin-top: 6px;
  color: #5f5f5f;
  font-size: 13px;
}

.detail ul {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.detail li {
  padding: 4px 8px;
  border-radius: 999px;
  background: #f3f3f3;
  font-size: 12px;
  font-weight: 700;
}
</style>
