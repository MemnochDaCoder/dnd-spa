import { createRouter, createWebHistory } from 'vue-router';
import SpellContainer from './components/SpellContainer.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SpellContainer,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
