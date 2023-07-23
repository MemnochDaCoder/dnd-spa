import { createRouter, createWebHistory } from 'vue-router';
import SpellContainer from './components/Spells/SpellContainer.vue';
import AllSpells from './components/Spells/AllSpells.vue';
import FilteredSpells from './components/Spells/FilteredSpells.vue';
import SpellFilters from './components/Spells/SpellFilters.vue';

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
