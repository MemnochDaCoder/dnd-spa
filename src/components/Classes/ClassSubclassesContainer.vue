<template>
    <div v-if="classSubclasses">
        <h3>Features</h3>
        <p v-if="classSubclasses">Total Features: {{ classSubclasses.count }}</p>
        <ul v-if="classSubclasses">
            <li v-for="subClass in classSubclasses.results" :key="subClass.index">
                {{ subClass.name }}
            </li>
        </ul>
        <p v-else>No subclasses available.</p>
    </div>
    <p v-else>No class subclasses data available.</p>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['classSubclasses']),
    },
};
</script>
