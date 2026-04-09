const { rules } = require('eslint-plugin-vue')

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 100, // 每行最大宽度
        trailingComma: 'none', // 无尾逗号
        endOfLine: 'auto' // 换行符
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // 允许 index.vue 命名
      }
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: 3, // 单行最多 3 个属性
        multiline: 1 // 多行每行 1 个属性
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 允许 props 解构
    'no-undef': 'error' // 禁止使用未定义的变量
  }
}
