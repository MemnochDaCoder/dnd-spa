<template>
    <div class="container">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs">
            <a class="nav-link active nav-item" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab"
                aria-controls="ex1-tabs-1" aria-selected="true">Spells</a>
        </ul>
        <!-- Tab Content Spells -->
        <div class="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
            <SpellFilters style="padding:20px;" @apply-filters="applyFilters"></SpellFilters>
            <div class="row" v-if="spells && spells.length && (filteredSpells.length === spells.length || spells && !filteredSpells)">
                <AllSpells @spells="spells"></AllSpells>
            </div>
            <div class="row" v-else-if="filteredSpells && filteredSpells.length && spells.length !== filteredSpells.length">
                <FilteredSpells></FilteredSpells>
            </div>
            <div v-else>
                No spells available.
            </div>
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
