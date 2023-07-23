<template>
    <div>
        <div v-if="skillDetails" class="mt-4">
            <h4>{{ skillDetails.name }}</h4>
            <p v-for="desc in skillDetails.desc" :key="desc">{{ desc }}</p>
            <div v-if="skillDetails.ability_score">
                <AbilityScoreDetail
                    v-if="abilityScoreDetails && abilityScoreDetails.index === skillDetails.ability_score.index"
                    :asd="abilityScoreDetails" />
            </div>
        </div>
    </div>
</template>
  
<script>
import AbilityScoreDetail from './AbilityScoreDetail.vue';
import { mapGetters } from 'vuex';

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
};
</script>
  