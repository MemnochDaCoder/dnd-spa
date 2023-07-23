<template>
    <div>
        <h3>Spells</h3>
        <ul>
            <li v-for="spell in spells" :key="spell.index">{{ spell.name }}</li>
        </ul>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['spells']),
        spells() {
            return this.spells || [];
        },
    },
};
</script>
