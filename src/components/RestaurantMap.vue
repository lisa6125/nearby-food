<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  restaurants: { type: Array, required: true },
  origin: { type: Object, required: true },
  selectedId: { type: String, default: '' },
  active: { type: Boolean, default: true },
})

const emit = defineEmits(['select'])

const root = ref(null)
let map
let layer
let fittedKey = ''

function markerIcon(restaurant) {
  const active = restaurant.id === props.selectedId
  return L.divIcon({
    className: 'map-pin-wrap',
    html: `<div class="map-pin${active ? ' is-active' : ''}">${restaurant.cuisine.slice(0, 1)}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  })
}

function draw() {
  if (!map) return
  layer?.remove()
  layer = L.layerGroup().addTo(map)

  L.circleMarker([props.origin.lat, props.origin.lng], {
    radius: 8,
    color: '#fff',
    weight: 3,
    fillColor: '#1c1c1c',
    fillOpacity: 1,
  })
    .bindTooltip('你的位置')
    .addTo(layer)

  const points = [[props.origin.lat, props.origin.lng]]
  for (const restaurant of props.restaurants) {
    L.marker([restaurant.lat, restaurant.lng], { icon: markerIcon(restaurant) })
      .bindTooltip(restaurant.name)
      .on('click', () => emit('select', restaurant.id))
      .addTo(layer)
    points.push([restaurant.lat, restaurant.lng])
  }

  const key = `${props.origin.lat.toFixed(4)},${props.origin.lng.toFixed(4)}:${props.restaurants.map((item) => item.id).join(',')}`
  if (key !== fittedKey && points.length) {
    map.fitBounds(points, { padding: [32, 32], maxZoom: 16 })
    fittedKey = key
  } else if (props.selectedId) {
    const selected = props.restaurants.find((item) => item.id === props.selectedId)
    if (selected) map.panTo([selected.lat, selected.lng])
  }
}

onMounted(() => {
  map = L.map(root.value, { zoomControl: true, attributionControl: true })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap',
  }).addTo(map)
  draw()
})

watch(
  () => [props.restaurants, props.selectedId, props.origin.lat, props.origin.lng],
  () => draw(),
)

watch(
  () => props.active,
  async (active) => {
    if (!active || !map) return
    await nextTick()
    map.invalidateSize()
    draw()
  },
)

onBeforeUnmount(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div ref="root" class="map-canvas"></div>
</template>

<style scoped>
.map-canvas {
  width: 100%;
  height: 100%;
  min-height: 280px;
  background: #e7e7e7;
}
</style>
