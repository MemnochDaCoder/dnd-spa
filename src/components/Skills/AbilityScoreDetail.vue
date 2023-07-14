<template>
  <div>
    <h4>{{ abilityScoreInfo.name }} ({{ abilityScoreInfo.full_name }})</h4>
    <p v-for="description in abilityScoreInfo.desc" :key="description">{{ description }}</p>
    <h5>Skills:</h5>
    <ul>
      <li v-for="skill in abilityScoreInfo.skills" :key="skill.index">
        <p>{{ skill.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['abilityScoreDetails']),
  },
  props: {
    abilityScoreInfo: {
      type: Object,
      required: true,
    },
  },
};
</script>
