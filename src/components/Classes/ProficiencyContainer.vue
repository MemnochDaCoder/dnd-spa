<template>
    <div v-if="classProficiencies && classProficiencies.length > 0">
        <div>
            <table class="table">
                <tbody>
                    <td>
                        <ul>
                            <li v-for="p in classProficiencies" :key="p">
                                {{ p.name }}
                            </li>
                        </ul>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['classProficiencies']),
    },
}
</script>