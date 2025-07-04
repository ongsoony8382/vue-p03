import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },

    {
      path: '/memo/add',
      component: () => import('@/views/Form.vue')
    },

    {
      path: '/memos/:id',
      component: () => import('@/views/Detail.vue')
    }
    
  ],
})

export default router
