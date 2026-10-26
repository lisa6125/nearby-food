import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MealView from '../views/MealView.vue'
import LocateUnavailableView from '../views/LocateUnavailableView.vue'
import ConfirmView from '../views/ConfirmView.vue'
import ReviewView from '../views/ReviewView.vue'
import SearchView from '../views/SearchView.vue'
import RandomView from '../views/RandomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/meal', name: 'meal', component: MealView },
    { path: '/meal/location-unavailable', name: 'location-unavailable', component: LocateUnavailableView },
    { path: '/meal/confirm', name: 'confirm', component: ConfirmView },
    { path: '/review', name: 'review', component: ReviewView },
    { path: '/search', name: 'search', component: SearchView },
    { path: '/random', name: 'random', component: RandomView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
