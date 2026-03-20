<script setup lang="ts">
import { ref } from 'vue'
import { client } from '@/services/client/client.gen'
import { useToast } from '@/stores/toast'

const emit = defineEmits<{ uploaded: [] }>()

const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const toast = useToast()

function openFilePicker() {
  fileInput.value?.click()
}

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  const formData = new FormData()
  for (const file of files) {
    formData.append('files', file)
  }

  isUploading.value = true
  try {
    await client.instance.post('/api/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    toast.showToast('Файли завантажено успішно', 'success')
    emit('uploaded')
  } catch {
    toast.showToast('Помилка завантаження файлів', 'error')
  } finally {
    isUploading.value = false
    input.value = ''
  }
}
</script>

<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
      width="34"
      height="34"
      :class="['cursor-pointer select-none', isUploading && 'opacity-50 pointer-events-none']"
      @click="openFilePicker"
    >
      <circle cx="17" cy="17" r="16" fill="rgba(250,246,242,0.92)" stroke="#C9A49A" stroke-width="1.2"/>
      <g transform="translate(17,17) scale(0.7) translate(-22,-22)">
        <path d="M10,30 L10,33 Q10,34 13,34 L31,34 Q34,34 34,33 L34,30" fill="none" stroke="#8B6B61" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="22" y1="10" x2="22" y2="28" stroke="#8B6B61" stroke-width="1.7" stroke-linecap="round"/>
        <polyline points="17,15 22,10 27,15" fill="none" stroke="#8B6B61" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
    <input
      ref="fileInput"
      type="file"
      accept="image/*,video/*"
      multiple
      class="hidden"
      @change="onFileChange"
    />
  </div>
</template>
