<template>
    <div v-if="classProficiencies.length > 0">
        <div>
            <table class="table">
                <tbody>
                    <td>
                        <ul>
                            <li v-for="p in classProficiencies" :key="p">
                            </li>
                        </ul>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            classProficiencies: [],
        }
    },
    computed: {
        ...mapGetters(['classProficiencies']),
        proficiencies(){
            return this.classProficiencies;
        }
    },
    methods: {
        ...mapActions['fetchProficiencies'],
        async getProficiencies(className) {
            this.classProficiencies = await this.fetchProficiencies(className);
        }
    },
}
</script>