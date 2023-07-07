import { createStore } from 'vuex';
import { fetchSpellDetails, fetchSpells } from '../api/api.js';

export default createStore({
  state() {
    return {
      spells: [],
      filteredSpells: [],
      spellLevels: [],
      spellSchools: [],
      spellDetails: null,
    };
  },
  getters: {
    filterSpells(state) {
      return state.filteredSpells;
    },
    spellLevels(state) {
      return state.spellLevels;
    },
    spellSchools(state) {
      return state.spellSchools;
    },
    spellDetails(state) {
      return state.spellDetails;
    },
  },
  mutations: {
    setSpells(state, spells) {
      state.spells = spells;
      state.filteredSpells = spells;
    },
    setSpellLevels(state, levels) {
      state.spellLevels = levels;
    },
    setSpellSchools(state, schools) {
      state.spellSchools = schools;
    },
    setFilteredSpells(state, spells) {
      state.filteredSpells = spells;
    },
    setSpellDetails(state, spellDetails) {
      state.spellDetails = spellDetails;
    },
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
