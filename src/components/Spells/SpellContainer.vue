<template>
    <div class="container">
        <SpellFilters style="padding:20px;" @apply-filters="applyFilters"></SpellFilters>
        <div class="row"
            v-if="spells && spells.length && (filteredSpells.length === spells.length || spells && !filteredSpells)">
            <AllSpells @spells="spells"></AllSpells>
        </div>
        <div class="row" v-else-if="filteredSpells && filteredSpells.length && spells.length !== filteredSpells.length">
            <FilteredSpells></FilteredSpells>
        </div>
        <div v-else>
            No spells available.
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SpellFilters from './SpellFilters.vue';
import AllSpells from './AllSpells.vue';
import FilteredSpells from './FilteredSpells.vue';

export default {
    name: 'SpellContainer',
    components: {
        SpellFilters,
        AllSpells,
        FilteredSpells,
    },
    computed: {
        ...mapGetters(['spells', 'filteredSpells']),
    },
    methods: {
        ...mapActions(['fetchSpells', 'applyFilters']),
        applyFilters() {
            this.fetchSpells();
        },
    },
    created() {
        this.fetchSpells();
    },
};
</script>
