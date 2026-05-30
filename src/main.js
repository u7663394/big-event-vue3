import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'

// 完整引入 Element Plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/main.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
