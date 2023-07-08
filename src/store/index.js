import { createStore } from 'vuex';
import { fetchSpellDetails, fetchSpells } from '../api/api.js';

export default createStore({
  state: {
    spells: [],
    filteredSpells: [],
    spellLevels: [],
    spellSchools: [],
    currentSpell: null,
  },
  mutations: {
    setSpells(state, spells) {
      state.spells = spells;
    },
    setFilteredSpells(state, filteredSpells) {
      state.filteredSpells = filteredSpells;
    },
    setSpellLevels(state, spellLevels) {
      state.spellLevels = spellLevels;
    },
    setSpellSchools(state, spellSchools) {
      state.spellSchools = spellSchools;
    },
    setSpellDetails(state, spellDetails) {
      state.currentSpell = spellDetails;
    },
  },
  getters: {
    filteredSpells: state => state.filteredSpells,
    spells: state => state.spells,
  },
  actions: {
    async fetchSpells({ commit }, filters = { levels: [], schools: [] }) {
      try {
        const spells = await fetchSpells(filters);
        commit('setSpells', spells);
        commit('setFilteredSpells', spells);
        commit('setSpellLevels', filters.levels);
        commit('setSpellSchools', filters.schools);
      } catch (error) {
        console.error('Error fetching spells:', error);
      }
    },
    async fetchSpellDetails({ commit }, spellIndex) {
      try {
        const spellDetails = await fetchSpellDetails(spellIndex);
        commit('setSpellDetails', spellDetails);
        return spellDetails;
      } catch (error) {
        console.error('Error fetching spell details:', error);
        throw error;
      }
    },
    async applyFilters({ commit, state }) {
      const selectedLevels = state.spellLevels ?? [];
      const selectedSchools = state.spellSchools ?? [];

      if (selectedLevels.length > 0 || selectedSchools.length > 0) {
        const filteredSpells = await fetchSpells({ levels: selectedLevels, schools: selectedSchools });
        commit('setFilteredSpells', filteredSpells);
      } else {
        commit('setFilteredSpells', state.spells);
      }
    },
  },
});
