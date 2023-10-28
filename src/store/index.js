import { createStore } from 'vuex';
import { fetchSpells, fetchSpellDetails, fetchClasses, fetchClassDetails, fetchClassSpells, fetchDetails, fetchEquipmentDetails, fetchAbilityScoreDetails, fetchSkillDetails } from '../api/api.js';

export default createStore({
  state: {
    spells: [],
    selectedLevels: [],
    selectedSchools: [],
    spellDetails: {},
    currentSpellIndex: null,
    filteredSpells: [],
    classes: [],
    selectedClassIndex: null,
    classDetails: {},
    classSpells: {},
    classProficiencies: {},
    classFeatures: {},
    skillDetails: {},
    abilityScoreDetails: {},
    instrumentDetails: {},
    proficiencyDetails: {},
    toolDetails: {},
    equipmentDetails: {},
    equipmentCategory: {},
    weaponDetails: {},
    weaponProperties: {},
    subclassDetails: {},
    subclassLevels: [],
    subclassFeatures: [],
    feature: {},
    equipmentList: {},
    damageTypeDetails: {},
    damageTypes: [],
    magicItemList: {},
    magicItemDetail: {},
    heavyArmor: [],
    mediumArmor: [],
    lightArmor: [],
    wondrousItems: [],
  },
  mutations: {
    SET_CLASSES(state, classes) {
      state.classes = classes;
    },
    SET_SELECTED_CLASS_INDEX(state, index) {
      state.selectedClassIndex = index;
    },
    SET_CLASS_DETAILS(state, { details }) {
      state.classDetails = details;
    },
    SET_CLASS_SPELLS(state, spells) {
      state.classSpells = spells;
    },
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
    SET_SKILL_DETAILS(state, skillDetail) {
      state.skillDetails = skillDetail;
    },
    SET_ABILITY_SCORE_DETAILS(state, scoreInfo) {
      state.abilityScoreDetails = scoreInfo;
    },
    SET_INSTRUMENT_DETAILS(state, details) {
      state.instrumentDetails = details;
    },
    SET_PROFICIENCY_DETAILS(state, details) {
      state.proficiencyDetails = details;
    },
    SET_TOOL_DETAILS(state, details) {
      state.toolDetails = details;
    },
    SET_EQUIPMENT_DETAILS(state, details) {
      state.equipmentDetails = details;
    },
    SET_EQUIPMENT_CATEGORY(state, details) {
      state.equipmentCategory = details;
    },
    SET_WEAPON_DETAILS(state, details) {
      state.weaponDetails = details;
    },
    SET_WEAPON_PROPERTIES(state, details) {
      state.weaponProperties = details;
    },
    SET_SUBCLASS_DETAILS(state, details) {
      state.subclassDetails = details;
    },
    SET_SUBCLASS_LEVEL_DETAILS(state, details) {
      state.subclassLevels = details;
    },
    SET_SUBCLASS_FEATURE(state, details) {
      state.feature = details;
    },
    SET_EQUIPMENT_LIST(state, details) {
      state.equipmentList = details;
    },
    SET_DAMAGE_TYPE_DETAILS(state, details) {
      state.damageTypeDetails = details;
    },
    SET_MAGIC_ITEM_LIST(state, details) {
      state.magicItemList = details;
    },
    SET_MAGIC_ITEM_DETAIL(state, details) {
      state.magicItemDetail = details;
    },
    SET_DAMAGE_TYPES(state, details) {
      state.damageTypes = details;
    },
    SET_HEAVY_ARMOR(state, details) {
      state.heavyArmor = details;
    },
    SET_MEDIUM_ARMOR(state, details) {
      state.mediumArmor = details;
    },
    SET_LIGHT_ARMOR(state, details) {
      state.lightArmor = details;
    },
    SET_WONDROUS_ITEMS(state, details) {
      state.wondrousItems = details;
    },
    SET_CLASS_PROFICIENCIES(state, details) {
      state.classProficiencies = details;
    },
    SET_CLASS_FEATURES(state, details) {
      state.classFeatures = details;
    },
  },
  actions: {
    async fetchClasses({ commit }) {
      try {
        const classes = await fetchClasses();
        commit('SET_CLASSES', classes);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClassDetails({ commit }, classIndex) {
      try {
        const details = await fetchClassDetails(classIndex);
        commit('SET_CLASS_DETAILS', { details });
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClassSpells({ commit }, classIndex) {
      try {
        let spells = await fetchClassSpells(classIndex);
        commit('SET_CLASS_SPELLS', spells);

      } catch (error) {
        console.error(error);
      }
    },
    selectClass({ commit }, classIndex) {
      commit('SET_SELECTED_CLASS_INDEX', classIndex);
    },
    async fetchSpells({ commit, state }) {
      const { selectedLevels, selectedSchools } = state;
      try {
        const spells = await fetchSpells(selectedLevels, selectedSchools);
        commit('SET_SPELLS', spells);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSpellDetails({ commit }, spellIndex) {
      if (spellIndex !== null) {
        try {
          const spellDetails = await fetchSpellDetails(spellIndex);
          commit('SET_SPELL_DETAILS', spellDetails);
          commit('SET_CURRENT_SPELL_INDEX', spellIndex);
        } catch (error) {
          console.error(error);
        }
      } else {
        commit('SET_SPELL_DETAILS', null);
        commit('SET_CURRENT_SPELL_INDEX', null);
      }
    },
    async applyFilters({ commit }, filters) {
      const { levels, schools } = filters;
      commit('SET_SELECTED_LEVELS', levels);
      commit('SET_SELECTED_SCHOOLS', schools);
      try {
        const spells = await fetchSpells(
          levels.map((level) => level.value),
          schools
        );
        commit('SET_FILTERED_SPELLS', spells);
      } catch (error) {
        console.error(error);
      }
    },
    clearFilters({ commit }) {
      commit('SET_SELECTED_LEVELS', []);
      commit('SET_SELECTED_SCHOOLS', []);
      commit('SET_FILTERED_SPELLS', []);
    },
    async fetchDetails(url) {
      if (typeof url === 'object') return;
      let data = await fetchDetails(url.toString());
      return await data;
    },
    async fetchDetailsByUrl({ commit }, { url, type }) {
      try {
        const details = await fetchDetails(url);
        switch (type) {
          case 'ability':
            commit('SET_ABILITY_SCORE_DETAILS', details);
            break;
          case 'skill':
            commit('SET_SKILL_DETAILS', details);
            break;
          case 'proficiency':
            commit('SET_PROFICIENCY_DETAILS', details);
            break;
          case 'instrument':
            commit('SET_INSTRUMENT_DETAILS', details);
            break;
          case 'equipment':
            commit('SET_EQUIPMENT_DETAILS', details);
            commit("SET_WEAPON_DETAILS", details);
            return details;
          case 'equipment_category':
            commit("SET_EQUIPMENT_CATEGORY", details);
            return details;
          case 'weapon':
            commit('SET_EQUIPMENT_DETAILS', details);
            commit("SET_WEAPON_DETAILS", details);
            return details;
          case 'weapon_properties':
            commit("SET_WEAPON_PROPERTIES", details);
            return details;
          case 'subclass_level':
            commit("SET_SUBCLASS_LEVEL_DETAILS", details);
            return details;
          case 'subclass_features':
            commit("SET_SUBCLASS_FEATURES", details);
            return details;
          case 'feature':
            commit("SET_SUBCLASS_FEATURE", details);
            return details;
          case 'equipment_list':
            commit("SET_EQUIPMENT_LIST", details);
            return details;
          case 'damage_type':
            commit('SET_DAMAGE_TYPES', details.results);
            break;
          case 'magic_item_list':
            commit("SET_MAGIC_ITEM_LIST", details);
            return details;
          case 'magic_item_detail':
            commit("SET_MAGIC_ITEM_DETAIL", details);
            return details;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchDetailsByIndex({ commit }, { index, type }) {
      try {
        let detail = {};
        let newIndex = index.includes('skill-') ? index.replace('skill-', '') : index;
        switch (type) {
          case 'ability':
            detail = await fetchAbilityScoreDetails(newIndex);
            commit('SET_ABILITY_SCORE_DETAILS', detail);
            break;
          case 'skill':
            detail = await fetchSkillDetails(newIndex);
            commit('SET_SKILL_DETAILS', detail);
            break;
          case 'instrument':
            detail = await fetchEquipmentDetails(newIndex);
            commit('SET_INSTRUMENT_DETAILS', detail);
            break;
          case 'tool':
            detail = await fetchEquipmentDetails(newIndex);
            commit('SET_TOOL_DETAILS', detail);
            break;
          case 'equipment':
            detail = await fetchEquipmentDetails(newIndex);
            commit('SET_EQUIPMENT_DETAILS', detail);
            break;
          default:
            break;
        }
        return detail;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEquipmentOptions({ commit }, { url, type }) {
      try {
        const details = await fetchDetails(url);
        switch (type) {
          case 'ability':
            commit('SET_ABILITY_SCORE_DETAILS', details);
            break;
          case 'skill':
            commit('SET_SKILL_DETAILS', details);
            break;
          case 'proficiency':
            commit('SET_PROFICIENCY_DETAILS', details);
            break;
          case 'instrument':
            commit('SET_INSTRUMENT_DETAILS', details);
            break;
          case 'equipment':
            commit('SET_EQUIPMENT_DETAILS', details);
            return details;
          case 'subclass':
            commit('SET_SUBCLASS_DETAILS', details);
            return details;
          case 'subclass_level':
            commit('SET_SUBCLASS_LEVEL_DETAILS', details);
            return details;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchArmors() {
      const heavy = await fetchDetails('/api/equipment-categories/heavy-armor');
      const medium = await fetchDetails('/api/equipment-categories/medium-armor');
      const light = await fetchDetails('/api/equipment-categories/light-armor');

      this.commit('SET_HEAVY_ARMOR', heavy.equipment);
      this.commit('SET_MEDIUM_ARMOR', medium.equipment);
      this.commit('SET_LIGHT_ARMOR', light.equipment);
    },
    async fetchWondrousItems() {
      const ft = await fetchDetails("/api/magic-items/feather-token");
      const fwp = await fetchDetails("/api/magic-items/figurine-of-wondrous-power");
      const rw = await fetchDetails("/api/equipment-categories/ranged-weapons");
      const mw = await fetchDetails("/api/equipment-categories/martial-weapons");
      const sw = await fetchDetails("/api/equipment-categories/simple-weapons");

      const wondrousItems = [
        { "type": "FeatherToken", "variants": ft.variants },
        { "type": "FigurineOfWondrousPower", "variants": fwp.variants },
        { "type": "RangedWeapons", "variants": rw.equipment },
        { "type": "MartialWeapons", "variants": mw.equipment },
        { "type": "SimpleWeapons", "variants": sw.equipment },
      ];

      const promises = wondrousItems.map(item => this.dispatch('fetchDetails', item.url));
      const results = await Promise.all(promises);

      // Merge the results with the item types
      let mergedWondrousItems = wondrousItems.map((item, index) => ({ ...item, detail: results[index] }));

      // Commit the result to the store
      this.commit('SET_WONDROUS_ITEMS', mergedWondrousItems);
    },
    async fetchSpellsByLevel() {
      let display = [[], [], [], [], [], [], [], [], [], []];

      let cantrips = await fetchDetails('/api/spells?level=0');
      let lOne = await fetchDetails('/api/spells?level=1');
      let lTwo = await fetchDetails('/api/spells?level=2');
      let lThree = await fetchDetails('/api/spells?level=3');
      let lFour = await fetchDetails('/api/spells?level=4');
      let lFive = await fetchDetails('/api/spells?level=5');
      let lSix = await fetchDetails('/api/spells?level=6');
      let lSeven = await fetchDetails('/api/spells?level=7');
      let lEight = await fetchDetails('/api/spells?level=8');
      let lNine = await fetchDetails('/api/spells?level=9');

      display[0] = cantrips.results;
      display[1] = lOne.results;
      display[2] = lTwo.results;
      display[3] = lThree.results;
      display[4] = lFour.results;
      display[5] = lFive.results;
      display[6] = lSix.results;
      display[7] = lSeven.results;
      display[8] = lEight.results;
      display[9] = lNine.results;

      return display;
    },
    async fetchClassProficiencies({ commit }, className) {
      try {
        let cP = await fetchDetails(`/api/classes/${className}/proficiencies`);
        commit('SET_CLASS_PROFICIENCIES', cP.results);
      }
      catch (error) {
        console.log(error);
      }
    },
    async fetchClassFeatures({ commit }, className) {
      try {
        let f = await fetchDetails(`/api/classes/${className}/features`);
        commit('SET_CLASS_FEATURES', f.results);
      }
      catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    classes: (state) => state.classes,
    selectedClassIndex: (state) => state.selectedClassIndex,
    selectedClass: (state) => {
      const { classes, selectedClassIndex } = state;
      return classes.find((cls) => cls.index === selectedClassIndex);
    },
    classDetails: (state) => state.classDetails,
    classSpells: (state) => state.classSpells,
    classProficiencies: (state) => state.classProficiencies,
    classFeatures: (state) => state.classFeatures,
    spells: (state) => state.spells,
    spellDetails: (state) => state.spellDetails,
    currentSpellIndex: (state) => state.currentSpellIndex,
    filteredSpells: (state) => state.filteredSpells,
    skillDetails: (state) => state.skillDetails,
    abilityScoreDetails: (state) => state.abilityScoreDetails,
    instrumentDetails: (state) => state.instrumentDetails,
    proficiencyDetails: (state) => state.proficiencyDetails,
    equipmentDetails: (state) => state.equipmentDetails,
    weaponDetails: (state) => state.weaponDetails,
    weaponProperties: (state) => state.weaponProperties,
    subclassDetails: (state) => state.subclassDetails,
    subclassLevels: (state) => state.subclassLevels,
    subclassFeatures: (state) => state.subclassFeatures,
    feature: (state) => state.feature,
    equipmentList: (state) => state.equipmentList,
    damageTypeDetails: (state) => state.damageTypeDetails,
    damageTypes: (state) => state.damageTypes,
    magicItemList: (state) => state.magicItemList,
    magicItemDetail: (state) => state.magicItemDetail,
    equipmentCategory: (state) => state.equipmentCategory,
    heavyArmor: (state) => state.heavyArmor,
    mediumArmor: (state) => state.mediumArmor,
    lightArmor: (state) => state.lightArmor,
    wondrousItems: (state) => state.wondrousItems,
  },
});
