import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. token
    const token = ref('')
    // 1.1. setToken
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 1.2. removeToken
    const removeToken = () => {
      token.value = ''
    }
    // 2. user
    const user = ref({})
    // 2.1. getUser
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    // 2.2. setUser
    const setUser = (newUser) => {
      user.value = newUser
    }
    // 最后需要 return
    return { token, setToken, removeToken, user, getUser, setUser }
  },
  {
    persist: true
  }
)
