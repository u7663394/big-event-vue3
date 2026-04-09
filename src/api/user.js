import request from '@/utils/request'

// 用户注册
export const userRegisterService = (data) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data
  })
}
