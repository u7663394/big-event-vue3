<script setup>
import en from 'element-plus/dist/locale/en.mjs'
</script>

<template>
  <el-config-provider :locale="en">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
