<script setup>
// 由于没有 this，需要使用 useRouter() 来获取 router 实例
import { useRouter } from 'vue-router'
const router = useRouter()
const goList = () => {
  router.push('/list')
}
</script>

<template>
  <div>我是App</div>
  <el-button type="primary" @click="$router.push('/home')">跳转首页</el-button>
  <el-button type="success" @click="goList">跳转列表页</el-button>
</template>

<style scoped></style>
