<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'success'
}>(), {
  type: 'primary'
})
const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="v-button"
    :class="`v-button__${type}`"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
</style>
