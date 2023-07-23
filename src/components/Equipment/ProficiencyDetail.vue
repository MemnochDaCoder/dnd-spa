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
            <div class="card">
                <div class="card-header">Skill Detail</div>
                <div class="card-body">
                    <p><strong>Proficient Skills:</strong> {{ proficiencyDetail.name }}</p>
                    <p><strong>Description:</strong> {{ proficiencyDetail.desc }}</p>
                </div>
            </div>
        </div>
        <div v-else-if="proficiencyDetail.index &&
            (proficiencyDetail.index.includes('str') ||
                proficiencyDetail.index.includes('con') ||
                proficiencyDetail.index.includes('dex') ||
                proficiencyDetail.index.includes('wis') ||
                proficiencyDetail.index.includes('int') ||
                proficiencyDetail.index.includes('cha'))
            ">
            <div class="card">
                <div class="card-header">Ability Score Detail</div>
                <div class="card-body">
                    <p><strong>Ability Score:</strong> {{ proficiencyDetail.name }}</p>
                    <p><strong>Description:</strong> {{ proficiencyDetail.desc }}</p>
                </div>
            </div>
        </div>
        <div v-else-if="proficiencyDetail.index &&
            (proficiencyDetail.index.includes('bagpipes') ||
                proficiencyDetail.index.includes('drum') ||
                proficiencyDetail.index.includes('dulcimer') ||
                proficiencyDetail.index.includes('flute') ||
                proficiencyDetail.index.includes('lute') ||
                proficiencyDetail.index.includes('lyre') ||
                proficiencyDetail.index.includes('horn') ||
                proficiencyDetail.index.includes('shawm') ||
                proficiencyDetail.index.includes('viol'))
            ">
            <div class="card">
                <div class="card-header">Instrument Detail</div>
                <div class="card-body">
                    <p><strong>Instrument:</strong> {{ proficiencyDetail.name }}</p>
                    <p><strong>Description:</strong> {{ proficiencyDetail.desc }}</p>
                </div>
            </div>
        </div>
        <div v-else-if="proficiencyDetail.index && proficiencyDetail.index.includes('tools')">
            <div class="card">
                <div class="card-header">Artisan Tools</div>
                <div class="card-body">
                    <p><strong>Tool:</strong> {{ proficiencyDetail.name }}</p>
                    <p><strong>Description:</strong> {{ proficiencyDetail.desc }}</p>
                </div>
            </div>
        </div>
        <div v-else-if="proficiencyDetail.index &&
            (proficiencyDetail.index.includes('armor') || proficiencyDetail.index.includes('weapons'))
            ">
            <div class="card">
                <div class="card-header">Equipment Detail</div>
                <div class="card-body">
                    <p><strong>Equipment:</strong> {{ proficiencyDetail.name }}</p>
                    <p><strong>Description:</strong> {{ proficiencyDetail.desc }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters(['proficiencyDetails']),
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        async getDetail(url) {
            try {
                const details = await this.fetchDetailsByUrl({ url, type: 'proficiency' });
                return details;
            } catch (error) {
                console.log(error);
                return null;
            }
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
  