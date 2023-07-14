<template>
    <div v-if="proficiencyDetail">
        <p><strong>Type:</strong> {{ proficiencyDetail.type }}</p>
        <div v-if="proficiencyDetail.classes && proficiencyDetail.classes.length > 0">
            <h5>Classes:</h5>
            <ul>
                <li v-for="classItem in proficiencyDetail.classes" :key="classItem.index">
                    <a :href="classItem.url">{{ classItem.name }}</a>
                </li>
            </ul>
        </div>
        <div v-if="proficiencyDetail.races && proficiencyDetail.races.length > 0">
            <h5>Races:</h5>
            <ul>
                <li v-for="race in proficiencyDetail.races" :key="race.index">
                    {{ race.name }}
                </li>
            </ul>
        </div>
        <div v-if="proficiencyDetail.reference">
            <h5>Reference:</h5>
            <button class="btn btn-info" type="button" v-if="proficiencyDetail.type === 'Skill'"
                @click="getSkillDetail(proficiencyDetail.reference.url, 'skill', proficiencyDetail.reference.index)">
                Name: {{ proficiencyDetail.reference.name }} - Skill
            </button>
            <button class="btn btn-info" type="button" v-else
                @click="getEquipmentDetail(proficiencyDetail.reference.url, 'equipment', proficiencyDetail.reference.index)">
                Name: {{ proficiencyDetail.reference.name }} - Equipment
            </button>
        </div>
        <div v-if="equipmentDetails && equipmentDetails.index === proficiencyDetail.reference.index">
            <EquipmentDetails :equipmentDetails="equipmentDetails" />
        </div>
        <div v-if="skillDetails && selectedSkill.index === proficiencyDetail.reference.index && selectedSkill.show">
            <SkillDetails :skillDetails="skillDetails" />
        </div>
    </div>
</template>
  
<script>
import SkillDetails from "../Skills/SkillDetails.vue";
import EquipmentDetails from "../Equipment/EquipmentDetail.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            selectedSkill: { index: null, show: false },
            selectedEquipment: {index: null, show: false},
        };
    },
    components: {
        SkillDetails,
        EquipmentDetails,
    },
    computed: {
        ...mapGetters(['skillDetails', 'equipmentDetails']),
    },
    props: {
        proficiencyDetail: {
            type: Object,
            required: true,
        },
    },
    methods: {
        ...mapActions(["fetchDetails"]),
        async getSkillDetail(url, type, index) {
            this.selectedSkill = {index: index, show: true};
            await this.fetchDetails({ url, type });
        },
        async getEquipmentDetail(url, type, index) {
            this.selectedEquipment = {index: index, show: true};
            await this.$store.dispatch('fetchDetails', { url, type });
        },
    },
};
</script>
  