import { createStore } from 'vuex';
import { fetchSpells, fetchSpellDetails } from '../api/api.js';

export default createStore({
  state: {
    spells: [],
    selectedLevels: [],
    selectedSchools: [],
    spellDetails: {},
    currentSpellIndex: null,
    filteredSpells: [],
  },
  mutations: {
    SET_SPELLS(state, spells) {
      state.spells = spells;
      state.filteredSpells = spells;
    },
    SET_SELECTED_LEVELS(state, levels) {
      state.selectedLevels = levels;
    },
    SET_SELECTED_SCHOOLS(state, schools) {
      state.selectedSchools = schools;
    },
    SET_SPELL_DETAILS(state, spell) {
      state.spellDetails = spell;
    },
    SET_CURRENT_SPELL_INDEX(state, index) {
      state.currentSpellIndex = index;
    },
    SET_FILTERED_SPELLS(state, filteredSpells) {
      state.filteredSpells = filteredSpells;
    },
  },
  actions: {
    async fetchSpells({ commit, state }) {
      const { selectedLevels, selectedSchools } = state;
      const spells = await fetchSpells(selectedLevels, selectedSchools);
      commit('SET_SPELLS', spells);
    },
    async fetchSpellDetails({ commit }, spellIndex) {
      if (spellIndex !== null) {
        const spellDetails = await fetchSpellDetails(spellIndex);
        commit('SET_SPELL_DETAILS', spellDetails);
        commit('SET_CURRENT_SPELL_INDEX', spellIndex);
      } else {
        commit('SET_SPELL_DETAILS', null);
        commit('SET_CURRENT_SPELL_INDEX', null);
      }
    },
    async applyFilters({ commit }, filters) {
      const { levels, schools } = filters;
      commit('SET_SELECTED_LEVELS', levels);
      commit('SET_SELECTED_SCHOOLS', schools);
      const spells = await fetchSpells(levels.map((level) => level.value), schools);
      commit('SET_FILTERED_SPELLS', spells);
    },
    clearFilters({ commit }) {
      commit('SET_SELECTED_LEVELS', []);
      commit('SET_SELECTED_SCHOOLS', []);
      commit('SET_FILTERED_SPELLS', []);
    },
  },
  getters: {
    spells: (state) => state.spells,
    spellDetails: (state) => state.spellDetails,
    currentSpellIndex: (state) => state.currentSpellIndex,
    filteredSpells: (state) => state.filteredSpells,
  },
});
