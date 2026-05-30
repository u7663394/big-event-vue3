<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { userUploadAvatarService } from '@/api/user'
import PageContainer from '@/components/PageContainer.vue'

/**
 * 选择图片后预览
 *  - 基于 FileReader 读取图片预览
 */
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = (e) => {
    imgUrl.value = e.target.result
  }
}

/**
 * 上传头像
 */
const onUpdateAvatar = async () => {
  await userUploadAvatarService(imgUrl.value)
  await userStore.getUser()
  ElMessage({ type: 'success', message: '更换头像成功' })
}
</script>

<template>
  <page-container title="更换头像">
    <el-row class="avatar-panel">
      <el-col :span="12" class="avatar-col">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <div class="avatar-actions">
          <el-button
            @click="uploadRef.$el.querySelector('input').click()"
            type="primary"
            :icon="Plus"
            size="large"
          >
            选择图片
          </el-button>
          <el-button type="success" :icon="Upload" size="large" @click="onUpdateAvatar">
            上传头像
          </el-button>
        </div>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-panel {
  padding: 10px 0;
}

.avatar-col {
  padding: 24px;
  background: var(--app-surface-muted);
  border: 1px solid rgba(223, 231, 228, 0.74);
  border-radius: var(--app-radius-md);
}

.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
      object-fit: cover;
    }

    .el-upload {
      border: 1px dashed rgba(15, 118, 110, 0.36);
      border-radius: 18px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      background: #ffffff;
      box-shadow: var(--app-shadow-sm);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
      transform: translateY(-2px);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: var(--app-text-muted);
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}

.avatar-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 18px;
}

@media (max-width: 900px) {
  .avatar-col {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>
