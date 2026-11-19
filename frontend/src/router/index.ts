import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 默认进入首页：访问 / 就是 HomePage
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: () => import('@/pages/user/UserLoginPage.vue'),
    },
    {
      path: '/user/register',
      name: 'userRegister',
      component: () => import('@/pages/user/UserRegisterPage.vue'),
    },
    {
      path: '/admin/userManage',
      name: 'userManage',
      component: () => import('@/pages/admin/UserManagePage.vue'),
    },
    // 兜底：访问不存在的地址时回首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
