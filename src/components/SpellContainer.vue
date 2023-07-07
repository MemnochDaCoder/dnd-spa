<template>
    <div class="spell-container">
        <div class="filters">
            <div class="filter-row">
                <div>
                    <MultiSelect v-model="selectedLevels" :options="levelOptions" :multiple="true"
                        placeholder="Select a spell level." track-by="value" label="label" />
                </div>
                <div>
                    <MultiSelect v-model="selectedSchools" :options="schoolOptions" :multiple="true"
                        placeholder="Select a school." />
                </div>
                <div>
                    <button class="btn btn-outline-primary" type="button" @click="applyFilters">Apply</button>
                </div>
            </div>
        </div>
        <div v-if="showApplyButton">
            <div v-if="filterSpells && filterSpells.length > 0">
                <div v-for="level in selectedLevels" :key="level">
                    <h2>Level {{ level }}</h2>
                    <div class="list-group">
                        <button v-for="spell in filterSpells" :key="spell.index"
                            class="list-group-item list-group-item-action button" aria-current="true"
                            @click="selectSpell(spell.index)">
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
        </div>
        <div v-else>
            <h2>All Spells</h2>
            <div class="list-group">
                <button v-for="spell in filterSpells" :key="spell.index"
                    class="list-group-item list-group-item-action button" aria-current="true"
                    @click="selectSpell(spell.index)">
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
        ...mapGetters(['filterSpells']),
    },
    mounted() {
        this.fetchSpells();
        this.applyFilters();
        this.showApplyButton = false;
    },
    methods: {
        ...mapActions(['fetchSpells', 'fetchSpellDetails', 'applyFilters']),
        applyFilters() {
            this.showApplyButton = true;
        },
        selectSpell(index) {
            this.fetchSpellDetails(index)
                .then((spellDetails) => {
                    this.currentSpell = spellDetails;
                })
                .catch((error) => {
                    console.error('Error fetching spell details:', error);
                });
        },
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
</style>