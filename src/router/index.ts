import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'
import WishlistView from '../views/WishlistView.vue'
import PhotosView from '../views/PhotosView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/details',
      name: 'Details',
      component: DetailsView
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: WishlistView
    },
    {
      path: '/photos',
      name: 'Photos',
      component: PhotosView
    },
    {
      path: '/admin-panel',
      name: 'AdminPanel',
      component: AdminView
    },
  ],
})

export default router
