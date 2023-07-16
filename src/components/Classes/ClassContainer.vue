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
                </div>
            </li>
        </ul>
    </div>
</template>  

<script>
import ClassDetails from './ClassDetails.vue';
import Spells from '../Spells/AllSpells.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['responseData'],
    components: {
        ClassDetails,
        Spells,
    },
    computed: {
        ...mapGetters(['classes', 'classDetails', 'classSpells']),
        spells() {
            return this.classSpells;
        },
    },
    mounted() {
        this.fetchClasses();
    },
    methods: {
        ...mapActions(['fetchClasses', 'fetchClassDetails', 'fetchClassSpells']),
        toggleResponseData(dndClass, type) {
            const showProperty = 'show' + type.charAt(0).toUpperCase() + type.slice(1);
            const fetchAction = 'fetchClass' + type.charAt(0).toUpperCase() + type.slice(1);
            dndClass[showProperty] = !dndClass[showProperty];

            if (dndClass[showProperty]) {
                if (!dndClass.responseData || !dndClass.responseData[type]) {
                    const classIndex = dndClass.index;
                    if (classIndex !== undefined) {
                        this.$store.dispatch(fetchAction, classIndex);
                    }
                }
                type === 'details' ? (dndClass.showDetails = true) : (dndClass.showDetails = false);
                type === 'spells' ? (dndClass.showSpells = !dndClass.showSpells) : (dndClass.showSpells = false);
            } else {
                dndClass.responseData = { ...dndClass.responseData, [type]: null };
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
  