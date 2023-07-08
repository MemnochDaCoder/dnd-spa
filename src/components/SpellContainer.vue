<template>
    <div class="spell-container">
        <div class="filters">
            <div class="filter-row">
                <div>
                    <MultiSelect v-model="selectedLevels" :options="levelOptions" :multiple="true"
                        placeholder="Select a spell level." track-by="value" label="label" :close-on-select="false" />
                </div>
                <div>
                    <MultiSelect v-model="selectedSchools" :options="schoolOptions" :multiple="true"
                        placeholder="Select a school." :close-on-select="false" />
                </div>
                <div>
                    <button class="btn btn-outline-primary" type="button" @click="applyFiltersAndShowButton">
                        Apply
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showApplyButton">
            <div v-for="level in selectedLevels" :key="level.value">
                <h2>{{ level.label }}</h2>
                <div v-if="selectedSchools.length > 0">
                    <div v-for="school in selectedSchools" :key="school">
                        <h3>{{ school }}</h3>
                        <div class="list-group">
                            <button v-for="spell in filterSpellsByLevelAndSchool(level.value, school)" :key="spell.index"
                                class="list-group-item list-group-item-action button" aria-current="true"
                                @click="selectSpell(spell.index)">
                                {{ spell.name }} <small>Level: {{ level.value }}</small>
                                <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="spellheader">Range</td>
                                                <td>{{ currentSpell.range }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Components</td>
                                                <td>{{ currentSpell.components }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Ritual</td>
                                                <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Duration</td>
                                                <td>{{ currentSpell.duration }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Concentration</td>
                                                <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Casting Time</td>
                                                <td>{{ currentSpell.casting_time }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Description</td>
                                                <td>
                                                    <ul>
                                                        <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="list-group">
                        <button v-for="spell in filterSpellsByLevel(level.value)" :key="spell.index"
                            class="list-group-item list-group-item-action button" aria-current="true"
                            @click="selectSpell(spell.index)">
                            {{ spell.name }} <small>Level: {{ level.value }}</small>
                            <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td class="spellheader">Range</td>
                                            <td>{{ currentSpell.range }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Components</td>
                                            <td>{{ currentSpell.components }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Ritual</td>
                                            <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Duration</td>
                                            <td>{{ currentSpell.duration }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Concentration</td>
                                            <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Casting Time</td>
                                            <td>{{ currentSpell.casting_time }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Description</td>
                                            <td>
                                                <ul>
                                                    <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>All Spells</h2>
            <div class="list-group">
                <button v-for="spell in spells" :key="spell.index" class="list-group-item list-group-item-action button"
                    aria-current="true" @click="selectSpell(spell.index)">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ spell.name }}</h5>
                        <small v-if="spell.level">Level: {{ spell.level }}</small>
                        <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td class="spellheader">Range</td>
                                        <td>{{ currentSpell.range }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Components</td>
                                        <td>{{ currentSpell.components }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Ritual</td>
                                        <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Duration</td>
                                        <td>{{ currentSpell.duration }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Concentration</td>
                                        <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Casting Time</td>
                                        <td>{{ currentSpell.casting_time }}</td>
                                    </tr>
                                    <tr>
                                        <td class="spellheader">Description</td>
                                        <td>
                                            <ul>
                                                <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import MultiSelect from 'vue-multiselect';

export default {
    name: 'SpellContainer',
    components: {
        MultiSelect,
    },
    data() {
        return {
            currentSpell: null,
            selectedLevels: [],
            selectedSchools: [],
            levelOptions: [
                { value: 0, label: 'Cantrips' },
                { value: 1, label: 'Level 1' },
                { value: 2, label: 'Level 2' },
                { value: 3, label: 'Level 3' },
                { value: 4, label: 'Level 4' },
                { value: 5, label: 'Level 5' },
                { value: 6, label: 'Level 6' },
                { value: 7, label: 'Level 7' },
                { value: 8, label: 'Level 8' },
                { value: 9, label: 'Level 9' },
            ],
            schoolOptions: [
                'Conjuration',
                'Necromancy',
                'Evocation',
                'Abjuration',
                'Transmutation',
                'Divination',
                'Enchantment',
                'Illusion',
            ],
            showApplyButton: false,
        };
    },
    created() {
        this.fetchSpells();
    },
    computed: {
        ...mapGetters(['spells']),
        filteredSpells() {
            const { spells } = this.$store.state;
            const filteredSpells = [];

            for (const spell of spells) {
                const { level, school } = spell;

                if (
                    (this.selectedLevels.length === 0 || this.selectedLevels.includes(level)) &&
                    (this.selectedSchools.length === 0 || this.selectedSchools.includes(school))
                ) {
                    filteredSpells.push(spell);
                }
            }

            return filteredSpells;
        },
    },
    methods: {
        ...mapActions(['fetchSpellsByLevelAndSchool', 'fetchSpellDetails', 'fetchSpells']),
        selectSpell(spellIndex) {
            if (this.currentSpell && this.currentSpell.index === spellIndex) {
                this.currentSpell = null;
            } else {
                this.$store.dispatch('fetchSpellDetails', spellIndex)
                    .then((spellDetails) => {
                        this.currentSpell = spellDetails;
                    });
            }
        },
        filterSpellsByLevel(level) {
            return this.filteredSpells.filter((spell) => spell.level === level);
        },
        filterSpellsByLevelAndSchool(level, school) {
            return this.filteredSpells.filter((spell) => spell.level === level && spell.school === school);
        },
        async applyFiltersAndShowButton() {
            // Fetch spells for each selected level and school combination
            for (const level of this.selectedLevels) {
                for (const school of this.selectedSchools) {
                    await this.fetchSpellsByLevelAndSchool({ level, school });
                }
            }
            // Show the apply button if necessary
            this.showApplyButton = true;
        },
    },
    watch: {
        selectedLevels() {
            this.showApplyButton = false;
        },
        selectedSchools() {
            this.showApplyButton = false;
        },
    },
};
</script>
  
<style scoped>
.spell-container {
    padding: 20px;
}

.filters {
    margin-bottom: 20px;
}

.filter-row {
    display: flex;
    align-items: center;
}

.filter-row>div {
    margin: 5px;
}

.button {
    width: 100%;
    text-align: left;
}

.table {
    margin-top: 10px;
}

.spellheader {
    font-weight: bold;
}

.small {
    font-size: 12px;
}
</style>
  

<!-- <template>
    <div class="spell-container">
        <div class="filters">
            <div class="filter-row">
                <div>
                    <MultiSelect v-model="selectedLevels" :options="levelOptions" :multiple="true"
                        placeholder="Select a spell level." track-by="value" label="label" :close-on-select="false" />
                </div>
                <div>
                    <MultiSelect v-model="selectedSchools" :options="schoolOptions" :multiple="true"
                        placeholder="Select a school." :close-on-select="false" />
                </div>
                <div>
                    <button class="btn btn-outline-primary" type="button" @click="applyFiltersAndShowButton">
                        Apply
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showApplyButton">
            <div v-for="level in selectedLevels" :key="level.value">
                <h2>{{ level.label }}</h2>
                <div v-if="selectedSchools.length > 0">
                    <div v-for="school in selectedSchools" :key="school">
                        <h3>{{ school }}</h3>
                        <div class="list-group">
                            <button v-for="spell in filterSpellsByLevelAndSchool(level.value, school)" :key="spell.index"
                                class="list-group-item list-group-item-action button" aria-current="true"
                                @click="selectSpell(spell.index)">
                                {{ spell.name }} <small>Level: {{ level.value }}</small>
                                <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td class="spellheader">Range</td>
                                                <td>{{ currentSpell.range }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Components</td>
                                                <td>{{ currentSpell.components }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Ritual</td>
                                                <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Duration</td>
                                                <td>{{ currentSpell.duration }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Concentration</td>
                                                <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Casting Time</td>
                                                <td>{{ currentSpell.casting_time }}</td>
                                            </tr>
                                            <tr>
                                                <td class="spellheader">Description</td>
                                                <td>
                                                    <ul>
                                                        <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="list-group">
                        <button v-for="spell in filterSpellsByLevel(level.value)" :key="spell.index"
                            class="list-group-item list-group-item-action button" aria-current="true"
                            @click="selectSpell(spell.index)">
                            {{ spell.name }} <small>Level: {{ level.value }}</small>
                            <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td class="spellheader">Range</td>
                                            <td>{{ currentSpell.range }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Components</td>
                                            <td>{{ currentSpell.components }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Ritual</td>
                                            <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Duration</td>
                                            <td>{{ currentSpell.duration }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Concentration</td>
                                            <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Casting Time</td>
                                            <td>{{ currentSpell.casting_time }}</td>
                                        </tr>
                                        <tr>
                                            <td class="spellheader">Description</td>
                                            <td>
                                                <ul>
                                                    <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2>All Spells</h2>
            <div class="list-group">
                <button v-for="spell in spells" :key="spell.index" class="list-group-item list-group-item-action button"
                    aria-current="true" @click="selectSpell(spell.index)">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ spell.name }}</h5>
                        <small v-if="spell.level !== undefined">Level: {{ spell.level }}</small>
                    </div>
                    <div class="mb-1" v-if="currentSpell && currentSpell.index === spell.index">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="spellheader">Range</td>
                                    <td>{{ currentSpell.range }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Components</td>
                                    <td>{{ currentSpell.components }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Ritual</td>
                                    <td>{{ currentSpell.ritual ? 'Yes' : 'No' }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Duration</td>
                                    <td>{{ currentSpell.duration }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Concentration</td>
                                    <td>{{ currentSpell.concentration ? 'Yes' : 'No' }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Casting Time</td>
                                    <td>{{ currentSpell.casting_time }}</td>
                                </tr>
                                <tr>
                                    <td class="spellheader">Description</td>
                                    <td>
                                        <ul>
                                            <li v-for="desc in currentSpell.desc" :key="desc">{{ desc }}</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>
    
<script>
import { mapActions, mapGetters } from 'vuex';
import '../styles/style.scss';

export default {
    name: 'SpellContainer',
    data() {
        return {
            currentSpell: null,
            selectedLevels: [],
            selectedSchools: [],
            levelOptions: [
                { value: 0, label: "Cantrips" },
                { value: 1, label: "Level 1" },
                { value: 2, label: "Level 2" },
                { value: 3, label: "Level 3" },
                { value: 4, label: "Level 4" },
                { value: 5, label: "Level 5" },
                { value: 6, label: "Level 6" },
                { value: 7, label: "Level 7" },
                { value: 8, label: "Level 8" },
                { value: 9, label: "Level 9" },
            ],
            schoolOptions: [
                'Conjuration',
                'Necromancy',
                'Evocation',
                'Abjuration',
                'Transmutation',
                'Divination',
                'Enchantment',
                'Illusion',
            ],
            showApplyButton: false,
        };
    },
    computed: {
        ...mapGetters(['filteredSpells', 'spells']),
        selectedLevels() {
            return this.$store.getters.selectedLevelOptions;
        },
        selectedSchools() {
            return this.$store.getters.selectedSchoolOptions;
        },
        filteredAndGroupedSpells() {
            return this.$store.getters.filteredAndGroupedSpells;
        },
    },
    mounted() {
        this.fetchSpells();
        this.showApplyButton = false;
    },
    methods: {
        ...mapActions(['fetchSpells', 'fetchSpellDetails', 'applyFilters']),
        async applyFiltersAndShowButton() {
            // Fetch spells for each selected level and school combination
            for (const level of this.selectedLevels) {
                for (const school of this.selectedSchools) {
                    await this.fetchSpellsByLevelAndSchool({ level, school });
                }
            }
            // Show the apply button if necessary
            this.showApplyButton = true;
        }
    },
    filterSpellsByLevel(level) {
        return this.filteredSpells
            .filter(group => group.level === level)
            .flatMap(group => group.spells);
    },
    filterSpellsByLevelAndSchool(level, school) {
        return this.filteredSpells
            .filter(group => group.level === level && group.school === school)
            .flatMap(group => group.spells);
    },
};
</script>
    
<style scoped>
.spells {
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

.filters {
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.filter-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter-row>div {
    margin: 0 10px;
}

.filter-row>select {
    margin: 10px;
}

.spellheader {
    font-weight: bold;
}
</style> -->
