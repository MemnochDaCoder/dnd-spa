<template>
    <div v-if="proficiencyDetail">
        <p><strong>Type:</strong> {{ proficiencyDetail.type }}</p>
        <div v-if="proficiencyDetail.classes && proficiencyDetail.classes.length > 0">
            <h5>Classes:</h5>
            <ul>
                <li v-for="classItem in proficiencyDetail.classes" :key="classItem.index">
                    {{ classItem.name }}
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
        <div v-if="proficiencyDetail.index && proficiencyDetail.index.includes('skill')">
            <SkillDetail v-if="proficiencyDetail.index && proficiencyDetail.index.includes('skill')"
                :skillDetails="getDetail(proficiencyDetail.index, 'skill')" />
        </div>
        <div v-else-if="proficiencyDetail.index && (proficiencyDetail.index.includes('str') || proficiencyDetail.index.includes('con')
            || proficiencyDetail.index.includes('dex') || proficiencyDetail.index.includes('wis')
            || proficiencyDetail.index.includes('int') || proficiencyDetail.index.includes('cha'))">
            <AbilityScoreDetail :asd="getDetail(proficiencyDetail.index, proficiencyDetail.type)" />
        </div>
        <div v-else-if="proficiencyDetail.index && (proficiencyDetail.index.includes('bagpipes') || proficiencyDetail.index.includes('drum')
            || proficiencyDetail.index.includes('dulcimer') || proficiencyDetail.index.includes('flute') || proficiencyDetail.index.includes('lute')
            || proficiencyDetail.index.includes('lyre') || proficiencyDetail.index.includes('horn')
            || proficiencyDetail.index.includes('shawm') || proficiencyDetail.index.includes('viol'))">
            <InstrumentDetail :instrumentDetails="getDetail(proficiencyDetail.index, proficiencyDetail.type)" />
        </div>
        <div v-else-if="proficiencyDetail.index && proficiencyDetail.index.includes('tools')">
            <ArtisanTools :tool="getDetail(proficiencyDetail.index, proficiencyDetail.type)" />
        </div>
        <div
            v-else-if="proficiencyDetail.index && (proficiencyDetail.index.includes('armor') || proficiencyDetail.index.includes('weapons'))">
            <EquipmentDetail :equipmentDetails="getDetail(proficiencyDetail.index, proficiencyDetail.type)" />
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import SkillDetail from '../Skills/SkillDetails.vue';
import AbilityScoreDetail from '../Skills/AbilityScoreDetail.vue';
import InstrumentDetail from '../Equipment/InstrumentDetail.vue';
import ArtisanTools from '../Equipment/ArtisanTools.vue';
import EquipmentDetail from '../Equipment/EquipmentDetail.vue';

export default {
    computed: {
        ...mapGetters(['proficiencyDetails']),
    },
    components: {
        SkillDetail,
        AbilityScoreDetail,
        InstrumentDetail,
        ArtisanTools,
        EquipmentDetail,
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl', 'fetchDetailsByIndex']),
        async getDetail(index, type) {
            try {
                let data = await this.fetchDetailsByIndex({ index, type });
                return data;
            }
            catch (error) {
                console.log(error);
            }

        },
        async getDetailByUrl(url, type) {
            let data = await this.fetchDetailsByUrl({ url, type });
            return data;
        },
    },
    props: {
        proficiencyDetail: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.$store.dispatch('fetchDetailsByUrl', {
            url: this.proficiencyDetail.url,
            type: 'proficiency',
        });
    },
};
</script>
  