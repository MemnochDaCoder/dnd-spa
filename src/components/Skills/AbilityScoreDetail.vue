<template>
  <div v-if="asd">
    <h4>{{ asd.full_name }}</h4>
    <p><strong>Abbreviation:</strong> {{ asd.index }}</p>
    <p><strong>Skills:</strong></p>
    <ul>
      <li v-for="skill in asd.skills" :key="skill.index">
        <a :href="skill.url">{{ skill.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    asd: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters['abilityScoreDetails'],
  }
};
</script>
