import { createStore } from 'vuex';
import { fetchSpellDetails, fetchSpellsByLevelAndSchool, fetchSpells } from '../api/api.js';

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
      const selectedLevels = state.selectedLevels ?? [];
      const selectedSchools = state.selectedSchools ?? [];
    
      if (selectedLevels.length === 0 && selectedSchools.length === 0) {
        return state.spells;
      }
    
      let filteredSpells = state.spells;
    
      if (selectedLevels.length > 0) {
        filteredSpells = filteredSpells.filter((spell) =>
          selectedLevels.includes(spell.level)
        );
      }
    
      if (selectedSchools.length > 0) {
        filteredSpells = filteredSpells.filter((spell) =>
          selectedSchools.includes(spell.school)
        );
      }
      
      return filteredSpells;
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
        const { levels = [], schools = [] } = filters;

        if (levels.length === 0 && schools.length === 0) {
          const spells = await fetchSpells(filters);
          commit('setSpells', spells);
          commit('setFilteredSpells', spells);
        } else {
          const spellPromises = levels.map((level) =>
            fetchSpellsByLevelAndSchool(level, schools)
          );

          const spellsByLevel = await Promise.all(spellPromises);

          const spells = spellsByLevel.reduce((accumulator, currentSpells) => {
            return accumulator.concat(currentSpells);
          }, []);

          const uniqueLevels = [...new Set(spells.map((spell) => spell.level))];
          const uniqueSchools = [...new Set(spells.map((spell) => spell.school))];

          commit('setSpells', spells);
          commit('setFilteredSpells', spells);
          commit('setSpellLevels', uniqueLevels);
          commit('setSpellSchools', uniqueSchools);
        }
      } catch (error) {
        console.error('Error fetching spells:', error);
      }
    },

    async applyFilters({ commit, state }, filters) {
      const { levels = [], schools = [] } = filters;
      let filteredSpells = state.spells;

      if (levels.length > 0 || schools.length > 0) {
        if (levels.length > 0) {
          filteredSpells = filteredSpells.filter((spell) =>
            levels.includes(spell.level)
          );
        }
        if (schools.length > 0) {
          filteredSpells = filteredSpells.filter((spell) =>
            schools.includes(spell.school)
          );
        }
      }
      commit('setFilteredSpells', filteredSpells);
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
  },
});


// import { createStore } from 'vuex';
// import { fetchSpellDetails, fetchSpellsByLevelAndSchool, fetchSpells } from '../api/api.js';

// export default createStore({
//   state() {
//     return {
//       spells: [],
//       filteredSpells: [],
//       spellLevels: [],
//       spellSchools: [],
//       spellDetails: null,
//     };
//   },
//   getters: {
//     filterSpells() {
//       if (this.selectedLevels.length === 0 && this.selectedSchools.length === 0) {
//         this.filteredSpells = this.spells;
//         return;
//       }
    
//       const selectedSchools = this.selectedSchools.map(school => `school=${school}`).join('&');
//       const apiCalls = this.selectedLevels.map(level =>
//         `https://www.dnd5eapi.co/api/spells?level=${level}&${selectedSchools}`
//       );
    
//       Promise.all(apiCalls.map(apiCall => fetch(apiCall).then(response => response.json())))
//         .then(results => {
//           this.filteredSpells = results.flat();
//         });
//     },    
//     spellLevels(state) {
//       return state.spellLevels;
//     },
//     spellSchools(state) {
//       return state.spellSchools;
//     },
//     spellDetails(state) {
//       return state.spellDetails;
//     },
//   },
//   mutations: {
//     setSpells(state, spells) {
//       state.spells = spells;
//       state.filteredSpells = spells;
//     },
//     setSpellLevels(state, levels) {
//       state.spellLevels = levels;
//     },
//     setSpellSchools(state, schools) {
//       state.spellSchools = schools;
//     },
//     applyFilters(state, filters) {
//       let filteredSpells = state.spells;
    
//       if ((filters.levels ?? []).length > 0 || (filters.schools ?? []).length > 0) {
//         if (filters.levels.length > 0) {
//           filteredSpells = filteredSpells.filter((spell) =>
//             filters.levels.includes(spell.level)
//           );
//         }
//         if (filters.schools.length > 0) {
//           filteredSpells = filteredSpells.filter((spell) =>
//             filters.schools.includes(spell.school)
//           );
//         }
//       }
//       state.filteredSpells = filteredSpells;
//     },    
//     setSpellDetails(state, spellDetails) {
//       state.spellDetails = spellDetails;
//     },
//     setFilteredSpells(state, spells){
//       state.filteredSpells = spells;
//     }
//   },
//   actions: {
//     async fetchSpells({ commit }, filters = { levels: [], schools: [] }) {
//       try {
//         const { levels = [], schools = [] } = filters;

//         if (levels.length === 0 && schools.length === 0) {
//           const spells = await fetchSpells(filters);
//           commit('setSpells', spells);
//           commit('setFilteredSpells', spells);
//         }
//         else {
//           const spellPromises = levels.map((level) =>
//             fetchSpellsByLevelAndSchool(level, schools)
//           );

//           const spellsByLevel = await Promise.all(spellPromises);

//           const spells = spellsByLevel.reduce((accumulator, currentSpells) => {
//             return accumulator.concat(currentSpells);
//           }, []);

//           const uniqueLevels = [...new Set(spells.map((spell) => spell.level))];
//           const uniqueSchools = [...new Set(spells.map((spell) => spell.school))];

//           commit('setSpells', spells);
//           commit('setSpellLevels', uniqueLevels);
//           commit('setSpellSchools', uniqueSchools);
//         }

//       } catch (error) {
//         console.error('Error fetching spells:', error);
//       }
//     },

//     async applyFilters({ commit, state }, filters) {
//       const { levels = [], schools = [] } = filters;
//       let filteredSpells = state.spells;
    
//       if (levels.length > 0 || schools.length > 0) {
//         if (levels.length > 0) {
//           filteredSpells = filteredSpells.filter((spell) =>
//             levels.includes(spell.level)
//           );
//         }
//         if (schools.length > 0) {
//           filteredSpells = filteredSpells.filter((spell) =>
//             schools.includes(spell.school)
//           );
//         }
//       }
//       commit('applyFilters', filteredSpells);
//     },

//     async fetchSpellDetails({ commit }, spellIndex) {
//       try {
//         const spellDetails = await fetchSpellDetails(spellIndex);
//         commit('setSpellDetails', spellDetails);
//         return spellDetails;
//       } catch (error) {
//         console.error('Error fetching spell details:', error);
//         throw error;
//       }
//     },
//   },
// });
