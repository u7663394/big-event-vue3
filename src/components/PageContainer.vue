<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div class="extra">
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(223, 231, 228, 0.86);
  border-radius: var(--app-radius-md);
  box-shadow: var(--app-shadow-sm);

  :deep(.el-card__header) {
    padding: 20px 22px;
    border-bottom: 1px solid rgba(223, 231, 228, 0.76);
    background: linear-gradient(90deg, rgba(230, 255, 251, 0.78), rgba(255, 255, 255, 0)), #ffffff;
  }

  :deep(.el-card__body) {
    padding: 22px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    span {
      color: var(--app-text);
      font-size: 18px;
      font-weight: 800;
      line-height: 1.3;
      text-wrap: pretty;
    }

    .extra {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>
