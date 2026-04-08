/**
 * 创建路由实例由 createRouter 实现
 *    - history 模式使用 createWebHistory()
 *    - hash 模式使用 createWebHashHistory()
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // BASE_URL 是 Vite 内置的环境变量，表示应用的基础路径
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
