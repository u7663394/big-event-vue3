<!-- 
Prompt: 
  请基于 elementPlus 和 Vue3 的语法，生成组件代码
  要求：
  一、表单结构要求
  1. 组件中包含一个 el-form 表单，有四行内容，前三行是输入框，第四行是按钮
  2. 第一行 label 登录名称，输入框禁用不可输入状态
  3. 第二行 label 用户昵称，输入框可输入
  4. 第三行 label 用户邮箱，输入框可输入
  5. 第四行按钮，提交修改

  二、校验需求
  给昵称和邮箱添加校验
  1. 昵称 nickname 必须是 2-10 位的非空字符串
  2. 邮箱 email 符合邮箱格式即可，且不能为空
-->

<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { userUpdateInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'
import PageContainer from '@/components/PageContainer.vue'

const {
  user: { username, nickname, email, id }
} = useUserStore()

const userInfo = ref({ username, nickname, email, id })

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是 2-10 位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}

const formRef = ref()
const userStore = useUserStore()
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userUpdateInfoService(userInfo.value)
    await userStore.getUser()
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <page-container title="基本资料">
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" ref="formRef"
label-width="100px" size="large">
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
