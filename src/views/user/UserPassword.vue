<!-- 
Prompt: 
  请基于 elementPlus 和 Vue3 的语法，生成组件代码
  要求：
  一、表单结构要求
  1. 组件中包含一个 el-form 表单，有四行内容，前三行是表单输入框，第四行是两个按钮
  2. 第一行 label 原密码
  3. 第二行 label 新密码
  4. 第三行 label 确认密码
  5. 第四行两个按钮，修改密码 和 重置

  二、form 绑定字段如下：
  const pwdForm = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  })

  三、校验需求
  所有字段，都是 6-15 位非空
  自定义校验1：原密码 和 新密码不能一样
  自定义校验2：新密码 和 确认密码必须一样
-->

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { userUpdatePassService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'

/**
 * 表单数据
 */
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

/**
 * 自定义校验函数一：原密码 和 新密码不能一样
 */
const checkOldSame = (rule, value, cb) => {
  if (value === pwdForm.value.old_pwd) {
    cb(new Error('原密码和新密码不能一样!'))
  } else {
    cb()
  }
}

/**
 * 自定义校验函数二：新密码 和 确认密码必须一样
 */
const checkNewSame = (rule, value, cb) => {
  if (value !== pwdForm.value.new_pwd) {
    cb(new Error('新密码和确认再次输入的新密码不一样!'))
  } else {
    cb()
  }
}

/**
 * 表单校验规则
 */
const rules = {
  // 原密码
  old_pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是 6-15 位的非空字符串',
      trigger: 'blur'
    }
  ],
  // 新密码
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是 6-15 位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkOldSame, trigger: 'blur' }
  ],
  // 确认新密码
  re_pwd: [
    { required: true, message: '请再次确认新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度必须是 6-15 位的非空字符串',
      trigger: 'blur'
    },
    { validator: checkNewSame, trigger: 'blur' }
  ]
}

/**
 * 修改密码 + 重置表单
 */
const formRef = ref(null)
const router = useRouter()
const userStore = useUserStore()
const onSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    await userUpdatePassService(pwdForm.value)
    ElMessage({ type: 'success', message: '更换密码成功' })
    // 重新登录
    userStore.setToken('')
    userStore.setUser({})
    router.push('/login')
  }
}
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form :model="pwdForm" :rules="rules" ref="formRef"
label-width="100px" size="large">
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
