<script setup lang="ts">
import { useToast } from '@/stores/toast';

const { toast } = useToast();
</script>

<template>
  <div class="toast" :class="{
    'toast_show': toast.show,
    'toast_info': toast.type === 'info',
    'toast_error': toast.type === 'error',
    'toast_warning': toast.type === 'warning',
    'toast_success': toast.type === 'success',
  }">
    {{ toast.message }}
  </div>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: calc(var(--inset-top) + 20px);
  right: 10px;
  max-width: 250px;
  transform: translateX(100%);
  z-index: 105;
  padding: 7px 15px;
  border-radius: 7px;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
  white-space: pre-wrap;
  text-align: right;
  word-break: break-word;
  color: var(--white);
  font-weight: 500;
  font-size: 14px;
  
  &_show {
    transform: translateX(0%);
    opacity: 1;
    pointer-events: all;
  }

  &_success {
    background-color: var(--sage-deep);
  }

  &_info {
    background-color: #DBEAFF;
  }

  &_error {
    background-color: #bb3235;
  }

  &_warning {
    background-color: var(--bark);
  }
}
</style>
