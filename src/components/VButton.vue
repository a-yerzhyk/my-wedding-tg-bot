<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'success' | 'danger',
  size?: 'small' | 'medium',
}>(), {
  type: 'primary',
  size: 'medium'
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="v-button"
    :class="`v-button_${type} v-button_${size}`"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
</style>
