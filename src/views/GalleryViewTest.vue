<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { GalleryDetail } from '@/services/types'
import { useRouter } from 'vue-router'
import { backButton } from '@tma.js/sdk'
import VLightbox from '@/components/VLightbox.vue'

const router = useRouter()
const gallery = ref<GalleryDetail | null>(null)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

async function loadGallery() {
  gallery.value = {
    id: "[object Object]",
    isOwner: true,
    photoCount: 7,
    photos: [
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/lnw8umf0vtzq8ku74cyk.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772553085/wedding/974334818/lnw8umf0vtzq8ku74cyk.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/o5i0arnqrt4jqasq87ri.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772553085/wedding/974334818/o5i0arnqrt4jqasq87ri.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/kbcmcuvnop02xhx2bmxw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772553084/wedding/974334818/kbcmcuvnop02xhx2bmxw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/xxlayx3a1tdzqiqchjjc.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772553084/wedding/974334818/xxlayx3a1tdzqiqchjjc.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
      {
        id:  "[object Object]",
        thumbnailUrl: "https://res.cloudinary.com/dffhljzre/image/upload/c_fill,h_400,q_auto,w_400/v1/wedding/974334818/vyxfruwd5ctxwipww9uw.webp?_a=BAMAOGfk0",
        uploadedAt: "[object Object]",
        url: "https://res.cloudinary.com/dffhljzre/image/upload/v1772489189/wedding/974334818/vyxfruwd5ctxwipww9uw.jpg"
      },
    ],
    user: {
      avatarUrl: "https://t.me/i/userpic/320/MkkkXEePjvcMwZAjP9aJmNTJJQeyPiGRbJo1To3Ph5s.svg",
      firstName: "Андрій",
      lastName: "Єржикевич",
      role: "admin",
      username: "andriiyer"
    }
  }
}

function openLightbox(index: number) {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

onMounted(async () => {
  backButton.show()
  backButton.onClick(router.back)
  await loadGallery()
})

onUnmounted(() => {
  backButton.hide()
  backButton.offClick(router.back)
})
</script>

<template>
  <div class="gallery-view">
    <div class="menu-view__container" v-if="gallery">
      <div class="menu-view__header">
        <p class="menu-view__subheading text-secondary">галерея гостя</p>
      </div>
      <div class="menu-view__content">
        <div class="gallery-view__list">
          <img
            v-for="(photo, index) in gallery.photos"
            :key="photo.id"
            class="gallery-view__item"
            :src="photo.thumbnailUrl"
            @click="openLightbox(index)"
          />
        </div>
      </div>
    </div>

    <VLightbox
      v-if="gallery"
      :is-owner="gallery.isOwner"
      :photos="gallery.photos"
      :start-index="lightboxIndex"
      :open="lightboxOpen"
      @close="lightboxOpen = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.gallery-view {
  background: var(--background-3);

  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.2rem;
  }

  &__item {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: var(--shadow-soft);
    cursor: pointer;
    transition: opacity 0.15s ease;

    &:active { opacity: 0.8 }
  }
}
</style>