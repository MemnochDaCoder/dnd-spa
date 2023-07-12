<template>
    <div class="row">
        <div class="col">
            <MultiSelect v-model="selectedLevels" :options="levelOptions" :multiple="true"
                placeholder="Select a spell level." track-by="value" label="label" :close-on-select="false" />
        </div>
        <div class="col">
            <MultiSelect v-model="selectedSchools" :options="schoolOptions" :multiple="true" placeholder="Select a school."
                :close-on-select="false" />
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    <button class="btn btn-outline-primary" type="button" @click="applyFilters">
                        Apply
                    </button>
                </div>
                <div class="col">
                    <div v-if="selectedLevels.length > 0 || selectedSchools.length > 0">
                        <button class="btn btn-outline-primary" type="button" @click="clearFilters">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import MultiSelect from 'vue-multiselect';

export default {
    name: 'SpellFilters',
    components: {
        MultiSelect,
    },
    data() {
        return {
            selectedLevels: [], // Initialize selectedLevels array
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
        };
    },
    methods: {
        ...mapActions(['applyFilters', 'fetchSpells']),
        applyFilters() {
            var filters = {
                levels: this.selectedLevels,
                schools: this.selectedSchools,
            };
            this.$store.dispatch('applyFilters', filters);
        },
        clearFilters() {
            this.selectedLevels = [];
            this.selectedSchools = [];
        },
    },
};
</script>
  