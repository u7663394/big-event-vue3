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
   左侧占 12 份; 右侧占 8 份，偏移 2 份居中 (2 + 8 + 2 = 12)
  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg">
      <div class="bg-content">
        <div class="brand-mark">Big Event</div>
        <h2>一站式内容发布与文章管理</h2>
        <p>后台管理界面，文章、分类和账号资料。</p>
      </div>
    </el-col>
    <el-col :span="8" :offset="2" class="form">
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
          <div class="form-heading">
            <span>新账号</span>
            <h1>注册</h1>
          </div>
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
          <el-link type="info" underline="never" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <el-form :model="formModel" :rules="rules" ref="form"
size="large" autocomplete="off" v-else>
        <el-form-item>
          <div class="form-heading">
            <span>欢迎回来</span>
            <h1>登录</h1>
          </div>
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
            <el-link type="primary" underline="never">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" underline="never" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  height: 100vh;
  min-height: 680px;
  overflow: hidden;
  background: radial-gradient(circle at 82% 18%, rgba(245, 158, 11, 0.12), transparent 24%),
    linear-gradient(135deg, #f5fbfa 0%, #ffffff 46%, #edf7f5 100%);

  .bg {
    position: relative;
    display: flex;
    align-items: flex-end;
    min-height: 100%;
    padding: 64px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(16, 32, 29, 0.1), rgba(16, 32, 29, 0.72)),
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 32px 32px 0;
    box-shadow: var(--app-shadow-md);

    &::before {
      position: absolute;
      inset: 24px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 24px;
      content: '';
      pointer-events: none;
    }

    &::after {
      position: absolute;
      top: 54px;
      left: 64px;
      width: 180px;
      height: 78px;
      background: url('@/assets/logo.png') no-repeat left center / 168px auto;
      content: '';
      filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.2));
    }

    .bg-content {
      position: relative;
      z-index: 1;
      max-width: 460px;
      color: #ffffff;

      .brand-mark {
        display: inline-flex;
        align-items: center;
        height: 32px;
        padding: 0 12px;
        margin-bottom: 18px;
        border: 1px solid rgba(255, 255, 255, 0.34);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.13);
        color: #dffcf7;
        font-size: 13px;
        font-weight: 800;
        backdrop-filter: blur(12px);
      }

      h2 {
        margin: 0;
        font-size: clamp(36px, 4vw, 58px);
        line-height: 1.04;
        letter-spacing: 0;
        text-wrap: pretty;
      }

      p {
        max-width: 390px;
        margin: 18px 0 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 17px;
        line-height: 1.8;
        text-wrap: pretty;
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    :deep(.el-form) {
      width: min(420px, 100%);
      padding: 42px 38px;
      background: rgba(255, 255, 255, 0.88);
      border: 1px solid rgba(223, 231, 228, 0.78);
      border-radius: 20px;
      box-shadow: var(--app-shadow-md);
      backdrop-filter: blur(18px);
    }

    :deep(.el-form-item:first-child) {
      margin-bottom: 28px;
    }

    .form-heading {
      display: grid;
      gap: 6px;

      span {
        color: var(--app-primary);
        font-size: 13px;
        font-weight: 800;
      }

      h1 {
        margin: 0;
        color: var(--app-text);
        font-size: 34px;
        line-height: 1.1;
      }
    }

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
      height: 44px;
      margin-top: 4px;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

@media (max-width: 900px) {
  .login-page {
    min-height: 100vh;

    .bg {
      display: none;
    }

    .form {
      width: 100%;
      max-width: none;
      flex: 0 0 100%;
      margin-left: 0;
      padding: 28px;
      align-items: center;
    }
  }
}
</style>
