<script setup>
import { ref, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { artAddChannelService, artEditChannelService } from '@/api/article'
const dialogVisible = ref(false)

/**
 * 表单数据 + 校验规则
 */
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}

/**
 * 对外暴露 open 方法, 用于区分编辑和添加
 *   1. open({ }) => 添加操作
 *   2. open({ id: xx, … }) => 编辑操作 => 需要回显数据
 *   3. 调用后打开弹层
 */
const open = async (row) => {
  dialogVisible.value = true // 打开弹层
  formModel.value = { ...row } // 回显数据
}
defineExpose({
  open
})

/**
 * 提交表单
 *   1. 校验表单
 *   2. 根据是否有 id 来区分编辑和添加
 *      2.1 有 id, 说明是编辑 -> 调用编辑接口
 *      2.2 没有 id, 说明是添加 -> 调用添加接口
 *   3. 调用后关闭弹层, 并通知父组件刷新列表
 */
const formRef = ref(null)
const emit = defineEmits(['success'])
const onSubmit = async () => {
  // 1. 校验
  await formRef.value.validate()
  // 2. 区分编辑和添加
  formModel.value.id
    ? await artEditChannelService(formModel.value)
    : await artAddChannelService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  // 3. 关闭弹层, 通知父组件刷新列表
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="30%">
    <!-- 表单内容 -->
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" minlength="1" maxlength="15"></el-input>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
