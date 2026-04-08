import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
import pinia from '@/stores/index'

// 完整引入 Element Plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
