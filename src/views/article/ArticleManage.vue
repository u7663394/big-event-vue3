<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { ref } from 'vue'
import { artGetListService, artDelService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

/**
 * 参数绑定/传递
 *  1. 分页参数
 *  2. 传递分类id
 *  3. 发布状态
 */
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

/**
 * 渲染文章列表 + loading 效果
 */
const loading = ref(false)
const articleList = ref([])
const total = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

/**
 * 处理分页逻辑
 *  1. @size-change
 *  2. @current-change
 */
const onSizeChange = (newSize) => {
  params.value.pagenum = 1 // 防止数据与页码错乱，重置页码为1
  params.value.pagesize = newSize
  getArticleList()
}
const onCurrentChange = (newPage) => {
  params.value.pagenum = newPage
  getArticleList()
}

/**
 * 搜索 + 重置
 */
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

/**
 * 编辑
 */
const articleEditRef = ref(null)
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

/**
 * 新增
 */
const onAddArticle = () => {
  articleEditRef.value.open({})
}

/**
 * 编辑/添加成功后刷新列表
 */
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，跳转渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  // 如果是编辑, 直接渲染
  getArticleList()
}

/**
 * 删除
 */
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <!-- 表单 inline: 内联表单 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- 
         v-model: 
          1. 在 Vue2 中 = :value + @input
          2. 在 Vue3 中 = :modelValue + @update:modelValue
        -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 150px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <template #default="{ row }">
          <!-- el-link: 链接效果 -->
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 
     分页组件: 
      1. v-model:current-page: 当前页码
      2. v-model:page-size: 每页条数
      3. :page-sizes: 每页条数选项
      4. layout: 显示哪些组件
          - jumper: 快速跳转
          - total: 总条数
          - sizes: 每页条数选择器
          - prev: 上一页按钮
          - pager: 页码按钮
          - next: 下一页按钮
      5. background: 是否设置背景色
      6. @size-change: 每页条数改变事件
      7. @current-change: 当前页码改变事件
      8. total: 总条数
    -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 4, 5, 10]"
      layout="jumper, total, sizes, prev, pager, next"
      background
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <!-- 弹窗 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
