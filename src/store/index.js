import { createStore } from 'vuex';
import { fetchSpells, fetchSpellsByLevelAndSchool, fetchSpellDetails } from '../api/api.js';

const state = {
  spells: [],
  selectedLevels: [],
  selectedSchools: [],
  selectedSpell: null,
};

const mutations = {
  SET_SPELLS(state, spells) {
    state.spells = spells;
  },
  SET_SELECTED_LEVELS(state, levels) {
    state.selectedLevels = levels;
  },
  SET_SELECTED_SCHOOLS(state, schools) {
    state.selectedSchools = schools;
  },
  SET_SPELL_DETAILS(state, details) {
    state.spellDetails = details;
  },
};

const actions = {
  async fetchSpells({ commit, state }) {
    const { selectedLevels, selectedSchools } = state;
    if (selectedLevels.length === 0 && selectedSchools.length === 0) {
      const spells = await fetchSpells({});
      commit('SET_SPELLS', spells);
    } else {
      const promises = [];
      for (const level of selectedLevels) {
        for (const school of selectedSchools) {
          promises.push(fetchSpellsByLevelAndSchool(level, school));
        }
      }
      const groupedSpells = await Promise.all(promises);
      commit('SET_SPELLS', groupedSpells.flat());
    }
  },
  async fetchSpellsByLevelAndSchool({ commit }, { level, school }) {
    const spells = await fetchSpellsByLevelAndSchool(level, school);
    commit('SET_SPELLS', spells);
  },
  async fetchSpellDetails({ commit }, spellIndex) {
    const spellDetails = await fetchSpellDetails(spellIndex);
    commit('SET_SPELL_DETAILS', spellDetails);
    return spellDetails;
  },
  setSelectedLevels({ commit }, levels) {
    commit('SET_SELECTED_LEVELS', levels);
  },
  setSelectedSchools({ commit }, schools) {
    commit('SET_SELECTED_SCHOOLS', schools);
  },
};

const getters = {
  spells: (state) => {
    return state.spells;
  },
  getSpellByIndex: (state) => (spellIndex) => {
    return state.spells.find((spell) => spell.index === spellIndex);
  },
  filteredAndGroupedSpells(state) {
    const spellsByLevel = {};
    const { spells } = state;

    for (const spell of spells) {
      const { level, school } = spell;
      if (!spellsByLevel[level]) {
        spellsByLevel[level] = {};
      }
      if (!spellsByLevel[level][school]) {
        spellsByLevel[level][school] = [];
      }
      spellsByLevel[level][school].push(spell);
    }

    return spellsByLevel;
  },
  selectedLevelOptions(state) {
    const { spells, selectedLevels } = state;
    const levelOptions = [];

    for (const spell of spells) {
      const { level } = spell;
      if (!levelOptions.includes(level) && selectedLevels.includes(level)) {
        levelOptions.push(level);
      }
    }

    return levelOptions;
  },
  selectedSchoolOptions(state) {
    const { spells, selectedSchools } = state;
    const schoolOptions = [];

    for (const spell of spells) {
      const { school } = spell;
      if (!schoolOptions.includes(school) && selectedSchools.includes(school)) {
        schoolOptions.push(school);
      }
    }

    return schoolOptions;
  },
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
