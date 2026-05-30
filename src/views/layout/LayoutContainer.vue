<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'

/**
 * 获取用户信息
 */
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})

/**
 * 下拉菜单处理:
 *   - 跳转路由
 *   - 退出登录
 */
const router = useRouter()
const handleCommand = async (command) => {
  switch (command) {
    case 'profile':
      router.push('/user/profile')
      break
    case 'avatar':
      router.push('/user/avatar')
      break
    case 'password':
      router.push('/user/password')
      break
    case 'logout':
      await ElMessageBox.confirm('您确定要退出登录吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      userStore.removeToken()
      userStore.setUser({})
      router.push('/login')
      break
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="220px">
      <div class="el-aside__logo"></div>
      <!-- 
       菜单组件: 
        1. active-text-color: 激活菜单项的文本颜色
        2. background-color: 菜单背景颜色
        3. :default-active: 默认激活的菜单项
           $route.path 为当前路由路径
        4. text-color: 菜单项默认文本颜色
        5. router: 开启路由模式，菜单项的 index 将被视为路由路径
      -->
      <el-menu
        active-text-color="#2dd4bf"
        background-color="#10201d"
        :default-active="$route.path"
        text-color="#dce8e5"
        router
      >
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <!-- 
         多级菜单: 
          template #title: 多级菜单的标题
        -->
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-title">
          <span class="eyebrow">Big Event 工作台</span>
          <strong>{{ userStore.user.nickname || userStore.user.username }}</strong>
        </div>
        <!-- 
         下拉菜单: 
          1. placement: 下拉菜单的弹出位置
          2. @command: 点击菜单项时触发事件，参数由菜单项的 command 传入
        -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <!-- 默认显示内容 -->
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- 
           下拉显示内容: 
            1. command: 点击菜单项时传递的参数
            2. :icon: 菜单项图标
          -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Big Event ©2026 Created Guochen Wang</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background: var(--app-bg);

  .el-aside {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(20, 184, 166, 0.16), transparent 32%),
      var(--app-sidebar);
    box-shadow: 10px 0 32px rgba(16, 32, 29, 0.12);

    &::after {
      position: absolute;
      right: 18px;
      bottom: 24px;
      width: 74px;
      height: 74px;
      border: 1px solid rgba(45, 212, 191, 0.24);
      border-radius: 24px;
      content: '';
      transform: rotate(12deg);
    }

    &__logo {
      position: relative;
      z-index: 1;
      height: 118px;
      margin: 0 18px 8px;
      background: url('@/assets/logo.png') no-repeat center / 132px auto;
      border-bottom: 1px solid rgba(220, 232, 229, 0.1);
    }

    .el-menu {
      position: relative;
      z-index: 1;
      border-right: none;
      padding: 8px 12px;
      background: transparent;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 46px;
      margin: 4px 0;
      border-radius: 10px;
      color: #dce8e5;
    }

    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: rgba(45, 212, 191, 0.12);
      color: #ffffff;
      transform: translateX(2px);
    }

    :deep(.el-menu-item.is-active) {
      background: rgba(45, 212, 191, 0.16);
      box-shadow: inset 0 0 0 1px rgba(45, 212, 191, 0.24);
      color: #2dd4bf;
      font-weight: 700;
    }
  }

  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    padding: 0 28px;
    background: rgba(255, 255, 255, 0.88);
    border-bottom: 1px solid rgba(223, 231, 228, 0.8);
    backdrop-filter: blur(14px);

    .header-title {
      display: grid;
      gap: 4px;
      line-height: 1.2;

      .eyebrow {
        color: var(--app-text-muted);
        font-size: 12px;
        font-weight: 700;
      }

      strong {
        color: var(--app-text);
        font-size: 18px;
      }
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 8px 6px 6px;
      border: 1px solid transparent;
      border-radius: 999px;
      cursor: pointer;

      &:hover {
        background: var(--app-primary-soft);
        border-color: rgba(15, 118, 110, 0.16);
      }

      :deep(.el-avatar) {
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px rgba(15, 118, 110, 0.18);
      }

      .el-icon {
        color: var(--app-text-muted);
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-main {
    padding: 24px;
    overflow: auto;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0)),
      var(--app-bg);
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    background: var(--app-bg);
    border-top: 1px solid rgba(223, 231, 228, 0.7);
    font-size: 14px;
    color: var(--app-text-muted);
  }
}
</style>
