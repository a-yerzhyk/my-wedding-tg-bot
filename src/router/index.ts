import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'
import WishlistView from '../views/WishlistView.vue'
import GalleriesView from '../views/GalleriesView.vue'
import GalleryView from '../views/GalleryView.vue'
import AdminView from '../views/AdminView.vue'
import GalleryViewTest from '../views/GalleryViewTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: WishlistView
    },
    {
      path: '/galleries',
      name: 'galleries',
      component: GalleriesView,
    },
    {
      path: '/galleries/:id',
      name: 'gallery',
      component: GalleryView,
    },
    {
      path: '/admin-panel',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/test',
      name: 'test',
      component: GalleryViewTest
    },
  ],
})

export default router
