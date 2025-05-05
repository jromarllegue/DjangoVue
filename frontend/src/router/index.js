import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductView from '@/views/ProductView.vue';
import AdminView from '@/views/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product',
    name: 'productview',
    component: ProductView  // Lazy-loaded
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
