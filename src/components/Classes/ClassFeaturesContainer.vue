<template>
    <div v-if="classFeatures">
        <h3>Features</h3>
        <p v-if="classFeatures.count">Total Features: {{ classFeatures.count }}</p>
        <ul v-if="classFeatures && classFeatures.length > 0">
            <li v-for="feature in classFeatures" :key="feature.index">
                {{ feature.name }}
            </li>
        </ul>
        <p v-else>No features available.</p>
    </div>
    <p v-else>No class features data available.</p>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['classFeatures']),
    },
};
</script>
