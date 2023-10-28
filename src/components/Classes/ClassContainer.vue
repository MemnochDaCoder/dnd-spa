<template>
    <div>
        <h2>Classes</h2>
        <ul class="list-group">
            <li v-for="(dndClass) in classes" :key="dndClass" class="list-group-item">
                <h3>{{ dndClass.name }}</h3>
                <p>{{ dndClass.description }}</p>
                <div class="btn-group" role="group" aria-label="Class details.">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button @click="toggleResponseData(dndClass, 'subclasses')"
                            :class="['btn', getButtonColorClass(dndClass.name)]" :aria-pressed="dndClass.showSubclasses">
                            {{ dndClass.showSubclasses ? 'Hide Subclasses' : 'Get Subclasses' }}
                        </button>
                        <button @click="toggleResponseData(dndClass, 'spells')"
                            :class="['btn', getButtonColorClass(dndClass.name)]" :aria-pressed="dndClass.showSpells">
                            {{ dndClass.showSpells ? 'Hide Spells' : 'Get Spells' }}
                        </button>
                        <button @click="toggleResponseData(dndClass, 'features')"
                            :class="['btn', getButtonColorClass(dndClass.name)]" :aria-pressed="dndClass.showFeatures">
                            {{ dndClass.showFeatures ? 'Hide Features' : 'Get Features' }}
                        </button>
                        <button @click="toggleResponseData(dndClass, 'proficiencies')"
                            :class="['btn', getButtonColorClass(dndClass.name)]" :aria-pressed="dndClass.showProficiencies">
                            {{ dndClass.showProficiencies ? 'Hide Proficiencies' : 'Get Proficiencies' }}
                        </button>
                        <button @click="toggleResponseData(dndClass, 'details')"
                            :class="['btn', getButtonColorClass(dndClass.name)]" :aria-pressed="dndClass.showDetails">
                            {{ dndClass.showDetails ? 'Hide Details' : 'Get Details' }}
                        </button>
                    </div>
                </div>
                <div class="response-data mt-3">
                    <Spells v-if="dndClass.showSpells && classSpells" />
                    <ClassDetails v-if="dndClass.showDetails && classDetails" />
                    <Proficiencies v-if="dndClass.showProficiencies && this.classProficiencies" />
                    <Features v-if="dndClass.showFeatures && this.classFeatures" />
                    <Subclasses v-if="dndClass.showSubclasses && this.classSubclasses" />
                </div>
            </li>
        </ul>
    </div>
</template>  

<script>
import ClassDetails from './ClassDetails.vue';
import Spells from '../Classes/ClassSpells.vue';
import Proficiencies from '../Classes/ProficiencyContainer.vue'
import Features from '../Classes/ClassFeaturesContainer.vue'
import Subclasses from '../Classes/ClassSubclassesContainer.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['responseData'],
    components: {
        ClassDetails,
        Spells,
        Proficiencies,
        Features,
        Subclasses
    },
    computed: {
        ...mapGetters(['classes', 'classDetails', 'classSpells', 'classProficiencies', 'classFeatures', 'classSubclasses']),
    },
    mounted() {
        this.fetchClasses();
    },
    methods: {
        ...mapActions(['fetchClasses', 'fetchClassDetails', 'fetchClassSpells', 'fetchClassProficiencies', 'fetchClassFeatures', 'fetchSubclasses']),
        toggleResponseData(dndClass, type) {
            const types = ['details', 'spells', 'proficiencies', 'features', 'subclasses'];
            const showProperty = 'show' + type.charAt(0).toUpperCase() + type.slice(1);
            const fetchAction = 'fetchClass' + type.charAt(0).toUpperCase() + type.slice(1);

            // If the section is already displayed, hide it and return
            if (dndClass[showProperty]) {
                dndClass[showProperty] = false;
                return;
            }

            // Hide all sections
            types.forEach((t) => {
                const prop = 'show' + t.charAt(0).toUpperCase() + t.slice(1);
                dndClass[prop] = false;
            });

            // Fetch data and display the clicked section
            const classIndex = dndClass.index;
            if (classIndex !== undefined) {
                this.$store.dispatch(fetchAction, classIndex).then(() => {
                    dndClass[showProperty] = true;
                });
            }
        },
        fetchData(dndClass, type) {
            const classIndex = dndClass.index;
            if (type === 'details') {
                this.fetchClassDetails(classIndex).then((responseData) => {
                    dndClass.responseData = { ...dndClass.responseData, details: responseData };
                });
            }
            if (type === 'spells') {
                this.fetchClassSpells(classIndex).then((responseData) => {
                    dndClass.responseData = { ...dndClass.responseData, spells: responseData };
                });
            }
            if (type === 'proficiencies') {
                this.fetchClassProficiencies(classIndex).then((responseData) => {
                    dndClass.responseData = { ...dndClass.responseData, proficiencies: responseData };
                });
            }
            if (type === 'features') {
                this.fetchClassFeatures(classIndex).then((responseData) => {
                    dndClass.responseData = { ...dndClass.responseData, proficiencies: responseData };
                });
            }
            if (type === 'subclasses') {
                this.fetchClassFeatures(classIndex).then((responseData) => {
                    dndClass.responseData = { ...dndClass.responseData, proficiencies: responseData };
                });
            }
        },
        getButtonColorClass(className) {
            const colorMap = {
                Barbarian: 'btn-outline-danger',
                Bard: 'btn-outline-magenta',
                Cleric: 'btn-outline-light',
                Druid: 'btn-outline-warning',
                Fighter: 'btn-outline-brown',
                Monk: 'btn-outline-jade',
                Paladin: 'btn-outline-pink',
                Ranger: 'btn-outline-success',
                Rogue: 'btn-outline-yellow',
                Sorcerer: 'btn-outline-primary',
                Warlock: 'btn-outline-purple',
                Wizard: 'btn-outline-info',
            };
            return colorMap[className];
        },
    },
};
</script>
  
<style lang="scss">
@import '../../styles/classcontainer.scss';
</style>
  