// 封装请求模块
import axios from 'axios'
import router from '@/router'
import { userUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 创建 axios 实例
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 统一携带 token
    const userStore = userUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res.data
    }
    ElMessage.error(res.data.message || '网络异常')
    return Promise.reject(res.data)
  },
  (err) => {
    if (err.response?.status === 401) {
      ElMessage.error('token 过期，请重新登录')
      router.push('/login')
    }
    ElMessage.error(err.response.data.message || '网络异常')
    return Promise.reject(err)
  }
)

// 4. 导出实例
export default request
export { baseURL }
