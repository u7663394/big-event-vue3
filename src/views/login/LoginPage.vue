<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const isRegister = ref(false)
const userStore = useUserStore()
const router = useRouter()

/**
 * 注册功能
 *  - 校验
 *  - 注册
 */
// 1. 表单数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 2. 校验规则对象
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      // pattern: 正则表达式校验规则
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15的非空字符',
      trigger: 'blur'
    },
    {
      /**
       * 自定义校验规则 validator:
       *  - rule: 当前规则对象, 一般不使用
       *  - value: 当前表单元素的值
       *  - callback: 校验完成后的回调函数, 成功与否都必须调用
       */
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致!')) // 表示校验失败
        } else {
          callback() // 表示校验成功
        }
      },
      trigger: 'blur'
    }
  ]
}
// 3. 表单预校验: 提交前校验整个表单
const form = ref(null)
const register = async () => {
  await form.value.validate()
  // 4. 调用注册接口
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功!')
  isRegister.value = false
}

/**
 * 切换时清空表单内容
 */
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

/**
 * 登陆功能
 *  - 校验
 *  - 登录
 *  - 存储 token
 */
const login = async () => {
  // 1. 表单预校验
  await form.value.validate()
  // 2. 调用登录接口
  const res = await userLoginService(formModel.value)
  // 3. 存储 token
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功!')
  router.push('/')
}
</script>

<template>
  <!-- 
   一行分成 24 份
   左侧占 12 份; 右侧占 6 份，偏移 3 份居中 (3 + 6 + 3 = 12)
  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 
       结构相关: 
        - form 是表单; 
        - 每一行用 el-form-item 包裹;
        - prefix-icon 是图标;
        - 使用 v-if 和 v-else 来切换登录和注册表单;
       校验相关: 
        - :model 绑定在 el-form 上，定义表单数据对象;
        - :rules 绑定在 el-form 上，定义校验规则对象;
        - v-model 绑定在表单元素上，绑定表单数据对象的子属性;
        - prop 绑定在 el-form-item 上，与 rules 中的字段名对应
      -->
      <el-form
        :rules="rules"
        :model="formModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="formModel" :rules="rules" ref="form"
size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/logo.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
