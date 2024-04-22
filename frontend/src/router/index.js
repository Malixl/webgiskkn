import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Master.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          name: 'landing',
          path: '/',
          component: () => import('../views/LandingView.vue')
        },
        {
          name: 'map',
          path: '/map',
          component: () => import('../views/MapView.vue')
        }
      ]
    },
    
  ]
})

export default router
