<template>
  <a-watermark content="水印">
    <BasicLayout />
  </a-watermark>
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/BasicLayout.vue'
import { useLoginUserStore } from '@/stores/counter.ts'

const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
</script>

<style scoped></style>
