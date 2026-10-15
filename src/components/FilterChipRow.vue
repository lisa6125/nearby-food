<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  chips: { type: Array, required: true },
})

const emit = defineEmits(['select', 'remove'])

const barEl = ref(null)
const rowEl = ref(null)
const measureEl = ref(null)
const moreMeasureEl = ref(null)
const visibleCount = ref(props.chips.length)
const listOpen = ref(false)

const shown = computed(() => props.chips.slice(0, visibleCount.value))
const overflow = computed(() => props.chips.slice(visibleCount.value))

function widthFor(nodes, count, withMore, moreWidth) {
  const gap = 8
  let width = 0
  for (let i = 0; i < count; i += 1) {
    if (i > 0) width += gap
    width += nodes[i].offsetWidth
  }
  if (withMore) {
    if (count > 0) width += gap
    width += moreWidth
  }
  return width
}

async function layout() {
  await nextTick()
  const row = rowEl.value
  const measure = measureEl.value
  const moreEl = moreMeasureEl.value
  if (!row || !measure || !moreEl) return

  const nodes = [...measure.querySelectorAll('[data-chip]')]
  const rowWidth = row.clientWidth
  if (!nodes.length || rowWidth <= 0) {
    visibleCount.value = 0
    return
  }

  let count = nodes.length
  if (widthFor(nodes, count, false, 0) > rowWidth) {
    count = 0
    for (let take = 1; take <= nodes.length; take += 1) {
      const hidden = nodes.length - take
      const withMore = hidden > 0
      if (withMore) moreEl.textContent = `+${hidden}`
      const moreWidth = withMore ? moreEl.offsetWidth : 0
      if (widthFor(nodes, take, withMore, moreWidth) <= rowWidth) count = take
      else break
    }
  }

  visibleCount.value = count
  if (count >= props.chips.length) listOpen.value = false
}

function toggleList(event) {
  event.stopPropagation()
  listOpen.value = !listOpen.value
}

function onDocumentClick(event) {
  if (!listOpen.value) return
  if (!barEl.value?.contains(event.target)) listOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') listOpen.value = false
}

let observer
onMounted(() => {
  layout()
  observer = new ResizeObserver(() => layout())
  observer.observe(rowEl.value)
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})

watch(() => props.chips.map((chip) => `${chip.id}:${chip.label}:${chip.active}`).join('|'), layout)
</script>

<template>
  <div ref="barEl" class="chip-bar">
    <div ref="rowEl" class="chips">
      <button
        v-for="chip in shown"
        :key="chip.id"
        type="button"
        class="chip"
        :class="{ on: chip.active, query: chip.kind === 'query' }"
        @click="chip.kind === 'cuisine' ? emit('select', chip) : undefined"
      >
        <span>{{ chip.label }}</span>
        <span
          v-if="chip.kind === 'query'"
          class="badge x"
          role="button"
          tabindex="0"
          aria-label="移除條件"
          @click.stop="emit('remove', chip)"
          @keydown.enter.stop.prevent="emit('remove', chip)"
        >×</span>
        <span v-else-if="chip.active" class="badge mark">✓</span>
        <span v-else class="badge plus">+</span>
      </button>
      <button
        v-if="overflow.length"
        type="button"
        class="chip more"
        :aria-expanded="listOpen"
        @click="toggleList"
      >
        +{{ overflow.length }}
      </button>
    </div>

    <div class="measure-host" aria-hidden="true">
    <div ref="measureEl" class="measure">
      <button
        v-for="chip in chips"
        :key="`m-${chip.id}`"
        type="button"
        class="chip"
        :class="{ query: chip.kind === 'query' }"
        data-chip
        tabindex="-1"
      >
        <span>{{ chip.label }}</span>
        <span v-if="chip.kind === 'query'" class="badge x">×</span>
        <span v-else-if="chip.active" class="badge mark">✓</span>
        <span v-else class="badge plus">+</span>
      </button>
      <button ref="moreMeasureEl" type="button" class="chip more" tabindex="-1">+99</button>
    </div>
    </div>

    <section v-if="listOpen" class="filter-list" aria-label="過濾條件">
      <header>
        <strong>過濾條件</strong>
        <button type="button" @click="listOpen = false">關閉</button>
      </header>
      <ul>
        <li v-for="chip in overflow" :key="chip.id">
          <button
            type="button"
            :class="{ on: chip.active }"
            @click="chip.kind === 'cuisine' ? emit('select', chip) : emit('remove', chip)"
          >
            <span>{{ chip.label }}</span>
            <small>{{ chip.kind === 'query' ? '移除搜尋' : '分類' }}</small>
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.chip-bar {
  position: relative;
  margin-top: 10px;
}

.chips,
.measure {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chips {
  overflow: hidden;
  flex-wrap: nowrap;
}

.measure-host {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}

.measure {
  display: flex;
  gap: 8px;
  width: max-content;
}

.chip {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  padding: 8px 12px 8px 14px;
  background: #f3f3f3;
  color: #1c1c1c;
  white-space: nowrap;
  cursor: pointer;
}

.chip.on,
.chip.query {
  background: #fff;
  box-shadow: inset 0 0 0 1px #eee;
}

.chip.more {
  justify-content: center;
  min-width: 44px;
  padding: 8px 12px;
  background: #1c1c1c;
  color: #fff;
  box-shadow: none;
  font-weight: 800;
}

.badge {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.mark,
.x {
  background: #f6c945;
  color: #1c1c1c;
}

.plus {
  color: #9a9a9a;
}

.filter-list {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  width: min(360px, 100%);
  max-height: 360px;
  overflow: auto;
  padding: 16px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 16px 40px rgba(70, 50, 0, 0.16);
}

.filter-list header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.filter-list header button {
  border: 0;
  background: transparent;
  color: #8d8d8d;
  font-weight: 800;
  cursor: pointer;
}

.filter-list ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.filter-list li button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 0;
  border-radius: 999px;
  background: #f3f3f3;
  cursor: pointer;
}

.filter-list li button.on {
  background: #fff;
  box-shadow: inset 0 0 0 1px #eee;
}

.filter-list small {
  color: #9a9a9a;
  white-space: nowrap;
}

.filter-list li button.on small {
  color: #1c1c1c;
}
</style>
