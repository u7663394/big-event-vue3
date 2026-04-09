<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { artGetChannelsService } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

/**
 * 获取文章分类列表 + loading 效果
 */
const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

/**
 * 编辑
 */
const dialog = ref(null)
const onEditChannel = (row) => {
  dialog.value.open(row)
}

/**
 * 删除
 */
const onDelChannel = (row) => {
  console.log(row)
}

/**
 * 添加
 */
const onAddChannel = () => {
  dialog.value.open({})
}

/**
 * 删除/添加/编辑成功后: 刷新列表
 */
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <!-- 
     主体表格:
      1. data 数据源
      2. label 是表头文本
      3. prop 是表格数据源的字段名
      4. v-loading 加载效果
    -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <!-- type="index" 表示这是一个索引列 -->
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <!-- 自定义列 -->
      <el-table-column label="操作" width="100">
        <!-- row 就是 channelList 的一项，类似于 v-for 中的 item -->
        <template #default="{ row }">
          <!-- plain 镂空样式 -->
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 无数据时显示 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
