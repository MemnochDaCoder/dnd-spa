<template>
    <div v-if="filteredSpells && filteredSpells.length">
        <h2>Filtered Spells</h2>
        <template v-if="selectedLevels.length > 0 && selectedSchools.length === 0">
            <div class="accordion" id="accordion-level">
                <div class="accordion-item" v-for="level in selectedLevels" :key="level">
                    <h2 class="accordion-header" :id="'header-level-' + level">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse-level-' + level" aria-expanded="false"
                            :aria-controls="'collapse-level-' + level">
                            <h3 v-if="level !== 0">Level: {{ level }}</h3>
                            <h3 v-else>Cantrips:</h3>
                        </button>
                    </h2>
                    <div :id="'collapse-level-' + level" class="accordion-collapse collapse"
                        :aria-labelledby="'header-level-' + level" data-bs-parent="#accordion-level">
                        <div class="accordion-body">
                            <div class="list-group">
                                <button class="list-group-item list-group-item-action btn"
                                    v-for="spell in getSpellsByLevelOnly(level)" :key="spell.index"
                                    @click="toggleSpellDetails(spell)">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{{ spell.name }}</h5>
                                        <small v-if="spell.level">Level: {{ spell.level }}</small>
                                    </div>
                                    <p class="mb-1" v-if="isSpellDetailsVisible(spell)">
                                        <SpellDetails :spell="spellDetails"></SpellDetails>
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="selectedLevels.length === 0 && selectedSchools.length > 0">
            <div class="accordion" id="accordion-school">
                <div class="accordion-item" v-for="school in selectedSchools" :key="school">
                    <h2 class="accordion-header" :id="'header-school-' + school">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse-school-' + school" aria-expanded="false"
                            :aria-controls="'collapse-school-' + school">
                            <h3>School: {{ school }}</h3>
                        </button>
                    </h2>
                    <div :id="'collapse-school-' + school" class="accordion-collapse collapse"
                        :aria-labelledby="'header-school-' + school" data-bs-parent="#accordion-school">
                        <div class="accordion-body">
                            <div class="list-group">
                                <button class="list-group-item list-group-item-action btn"
                                    v-for="spell in getSpellsBySchoolOnly(school)" :key="spell.index"
                                    @click="toggleSpellDetails(spell)">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{{ spell.name }}</h5>
                                        <small v-if="spell.level">Level: {{ spell.level }}</small>
                                    </div>
                                    <p class="mb-1" v-if="isSpellDetailsVisible(spell)">
                                        <SpellDetails :spell="spellDetails"></SpellDetails>
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="accordion" id="accordion-level-school">
                <div class="accordion-item" v-for="level in selectedLevels" :key="level">
                    <h2 class="accordion-header" :id="'header-level-' + level">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            :data-bs-target="'#collapse-level-' + level" aria-expanded="false"
                            :aria-controls="'collapse-level-' + level">
                            <h3 v-if="level !== 0">Level: {{ level }}</h3>
                            <h3 v-else>Cantrips:</h3>
                        </button>
                    </h2>
                    <div :id="'collapse-level-' + level" class="accordion-collapse collapse"
                        :aria-labelledby="'header-level-' + level" data-bs-parent="#accordion-level-school">
                        <div class="accordion-body">
                            <template v-for="school in uniqueSchools" :key="school">
                                <h4>School: {{ school }}</h4>
                                <div class="list-group">
                                    <button class="list-group-item list-group-item-action btn"
                                        v-for="spell in getSpellsByLevelAndSchool(level, school)" :key="spell.index"
                                        @click="toggleSpellDetails(spell)">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">{{ spell.name }}</h5>
                                            <small v-if="spell.level">Level: {{ spell.level }}</small>
                                        </div>
                                        <p class="mb-1" v-if="isSpellDetailsVisible(spell)">
                                            <SpellDetails :spell="spellDetails"></SpellDetails>
                                        </p>
                                    </button>
                                </div>
                            </template>
                            <div class="list-group">
                                <button class="list-group-item list-group-item-action btn"
                                    v-for="spell in getSpellsByLevelOnly(level)" :key="spell.index"
                                    @click="toggleSpellDetails(spell)">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="mb-1">{{ spell.name }}</h5>
                                        <small v-if="spell.level">Level: {{ spell.level }}</small>
                                    </div>
                                    <p class="mb-1" v-if="isSpellDetailsVisible(spell)">
                                        <SpellDetails :spell="spellDetails"></SpellDetails>
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import SpellDetails from './SpellDetails.vue';

export default {
    name: 'FilteredSpells',
    components: {
        SpellDetails,
    },
    computed: {
        ...mapGetters(['filteredSpells', 'currentSpellIndex', 'spellDetails']),
        uniqueLevels() {
            const levels = new Set();
            this.filteredSpells.forEach((spell) => {
                if (spell.level >= 0) {
                    levels.add(spell.level);
                }
            });
            return Array.from(levels);
        },
        uniqueSchools() {
            const schools = new Set();
            this.filteredSpells.forEach((spell) => {
                if (
                    spell.school &&
                    (this.selectedLevels.includes(spell.level) ||
                        this.selectedLevels.length === 0)
                ) {
                    schools.add(spell.school);
                }
            });
            const uniqueSchools = Array.from(schools);
            return uniqueSchools;
        },
        selectedLevels() {
            const levels = new Set();
            this.filteredSpells.forEach((spell) => {
                if (spell.level >= 0) {
                    levels.add(spell.level);
                }
            });
            const uniqueLevels = Array.from(levels);

            return uniqueLevels;
        },
        selectedSchools() {
            const schools = new Set();
            this.filteredSpells.forEach((spell) => {
                if (
                    spell.school &&
                    (this.selectedLevels.includes(spell.level) ||
                        this.selectedLevels.length === 0)
                ) {
                    schools.add(spell.school);
                }
            });
            const mySchools = Array.from(schools);

            return mySchools;
        },
    },
    methods: {
        toggleSpellDetails(spell) {
            if (this.currentSpellIndex === spell.index || this.currentSpellIndex === '') {
                this.$store.dispatch('fetchSpellDetails', null);
            } else {
                this.$store.dispatch('fetchSpellDetails', spell.index);
            }
        },
        getSpellsByLevelAndSchool(level, school) {
            if (school) {
                return this.filteredSpells.filter((spell) => spell.level === level && spell.school === school);
            } else {
                return this.getSpellsByLevelOnly(level);
            }
        },
        getSpellsByLevelOnly(level) {
            return this.filteredSpells.filter((spell) => spell.level === level && spell.school === '');
        },
        getSpellsBySchoolOnly(school) {
            return this.filteredSpells.filter((spell) => spell.school === school && spell.level === '');
        },
        isSpellDetailsVisible(spell) {
            return this.spellDetails && this.spellDetails.index === spell.index;
        },
    },
};
</script>
  