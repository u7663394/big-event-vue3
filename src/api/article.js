import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类
export const artAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}

// 编辑文章分类
export const artEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}

// 删除文章分类
export const artDelChannelService = (id) => {
  return request({
    method: 'delete',
    url: '/my/cate/del',
    params: {
      id
    }
  })
}

// 获取文章列表
export const artGetListService = (params) => {
  return request({
    url: '/my/article/list',
    params
  })
}

// 发布文章
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}
