import { createRouter, createWebHistory } from 'vue-router';
import SpellContainer from './components/SpellContainer.vue';
import AllSpells from './components/AllSpells.vue';
import FilteredSpells from './components/FilteredSpells.vue';
import SpellFilters from './components/SpellFilters.vue';

const routes = [
  { path: '/', name: 'Home', component: SpellContainer },
  { path: '/all-spells', component: AllSpells },
  { path: '/filtered', component: FilteredSpells },
  { path: '/spell-filters', component: SpellFilters },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
