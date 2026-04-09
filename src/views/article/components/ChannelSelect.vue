<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

/**
 * 渲染频道列表
 */
defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String,
    default: '150px'
  }
})
const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <el-select
    :style="{ width: width }"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
