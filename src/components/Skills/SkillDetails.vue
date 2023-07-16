<template>
    <div>
        <div v-if="resolvedSkillDetails" class="mt-4">
            <h4>{{ resolvedSkillDetails.name }}</h4>
            <p v-for="desc in resolvedSkillDetails.desc" :key="desc">{{ desc }}</p>
            <div v-if="resolvedSkillDetails.ability_score">
                <AbilityScoreDetail
                    v-if="abilityScoreDetails && abilityScoreDetails.index === resolvedSkillDetails.ability_score.index"
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
        resolvedSkillDetails() {
            if (this.skillDetails instanceof Promise) {
                return null;
            } else {
                return this.skillDetails;
            }
        },
    },
};
</script>
  