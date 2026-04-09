<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
const visibleDrawer = ref(false)
// 局部注册富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

/**
 * 对外暴露 open 方法
 */
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    console.log('编辑回显')
  } else {
    console.log('添加功能')
    formModel.value = { ...defaultForm }
  }
}
defineExpose({
  open
})

/**
 * 表单数据: 添加时需要初始化
 */
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })

/**
 * 文件预览:
 *  1. URL.createObjectURL(file.raw): 创建一个指向该文件的URL地址
 *  2. file.raw: 获取原始文件对象
 */
const imgUrl = ref('')
const onUploadFile = (file) => {
  imgUrl.value = URL.createObjectURL(file.raw) // 预览
  formModel.value.cover_img = file.raw
}
</script>

<template>
  <!-- 
   抽屉: 
    1. direction: 方向
    2. size: 大小
  -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 
         文件上传:
          1. auto-upload: 是否自动上传
          2. show-file-list: 是否显示文件列表
          3. on-change: 文件状态改变时的回调函数
        -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <!-- 本地预览 -->
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 
           富文本编辑器:
             1. theme: 主题
             2. v-model:content: 双向绑定内容
             3. contentType: 内容类型
          -->
          <quill-editor theme="snow" v-model:content="formModel.content" contentType="html">
          </quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
