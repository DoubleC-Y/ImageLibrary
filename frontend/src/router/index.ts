import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import HomePage from '@/pages/HomePage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import ACCESS_ENUM from '@/access/accessEnum.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 需要导航栏 + 页脚的页面都挂在这个布局下
    {
      path: '/',
      component: BasicLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        {
          path: 'admin/userManage',
          name: 'adminUserManage',
          component: UserManagePage,
          meta: { access: ACCESS_ENUM.ADMIN },
        },
      ],
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
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
