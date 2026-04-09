import request from '@/utils/request'

// 用户注册
export const userRegisterService = (data) => {
  return request({
    url: '/api/reg',
    method: 'post',
    data
  })
}

// 用户登录
export const userLoginService = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const userGetInfoService = () => {
  return request({
    url: '/my/userinfo',
    method: 'get'
  })
}

// 更新用户信息
export const userUpdateInfoService = (data) => {
  return request({
    url: '/my/userinfo',
    method: 'put',
    data
  })
}

// 更新用户头像
export const userUploadAvatarService = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'patch',
    data: { avatar }
  })
}
