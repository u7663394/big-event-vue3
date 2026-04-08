import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. token
    const token = ref('')
    // 2. setToken
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 3. removeToken
    const removeToken = () => {
      token.value = ''
    }
    // 最后需要 return
    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)
