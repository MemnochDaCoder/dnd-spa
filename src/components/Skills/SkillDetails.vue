<template>
    <div>
        <div v-if="skillDetails" class="mt-4">
            <h4>{{ skillDetails.name }}</h4>
            <p v-for="sd in skillDetails.desc" :key="sd">{{ sd }}</p>
            <button class="btn btn-info" v-if="skillDetails.ability_score"
                @click="getAbilityScoreDetail(skillDetails.ability_score.url, 'ability', skillDetails.ability_score.index)">
                Name: {{ skillDetails.ability_score.name }}
            </button>
            <AbilityScoreDetail
                v-if="abilityScoreDetails && abilityScoreDetails.index === skillDetails.ability_score.index"
                :abilityScoreInfo="abilityScoreDetails" />

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AbilityScoreDetail from './AbilityScoreDetail.vue';

export default {
    props: {
        skillDetails: {
            type: Object,
            required: true,
        },
    },
    components: {
        AbilityScoreDetail,
    },
    computed: {
        ...mapGetters(['abilityScoreDetails']),
    },
    methods: {
        ...mapActions(['fetchDetails']),
        async getAbilityScoreDetail(url, type) {
            await this.fetchDetails(url, type);
        }
    },
    mounted() {
        if (this.skillDetails && this.skillDetails.ability_score && this.skillDetails.ability_score.url) {
            this.$store.dispatch('fetchDetails', { url: this.skillDetails.ability_score.url, type: 'ability' });
        }
    },
};
</script>
  