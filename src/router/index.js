import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/pharmacy/list/period',
    name: 'PharmaciesListByDay',
    component: () => import('@/views/PharmaciesListByDay.vue')
  },
  {
    path: '/mask/list',
    name: 'MasksListByPharmacy',
    component: () => import('@/views/MasksListByPharmacy.vue')
  },
  {
    path: '/pharmacy/list/price',
    name: 'PharmaciesListByPrice',
    component: () => import('@/views/PharmaciesListByPrice.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
