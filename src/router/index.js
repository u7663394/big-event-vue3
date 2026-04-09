/**
 * 创建路由实例由 createRouter 实现
 *    - history 模式使用 createWebHistory()
 *    - hash 模式使用 createWebHashHistory()
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // BASE_URL 是 Vite 内置的环境变量，表示应用的基础路径
  history: createWebHistory(import.meta.env.BASE_URL),
  /**
   * 登陆 一级路由
   * 架子 一级路由
   *    文章管理 二级路由
   *    频道管理 二级路由
   *    个人详情 二级路由
   *    更换头像 二级路由
   *    重置密码 二级路由
   */
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') }
      ]
    }
  ]
})

export default router
