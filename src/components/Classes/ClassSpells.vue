<template>
    <div v-if="classSpells">
        <h3>Spells</h3>
        <p v-if="classSpells.spellcasting_ability">Abilty: {{ classSpells.spellcasting_ability.name }} @ Level: {{
            classSpells.level }}</p>
        <ul v-if="classSpells.info && classSpells.info.length > 0">
            <li v-for="spell in classSpells.info" :key="spell.name">
                {{ spell.name }}
                <div v-if="spell.info && spell.info.desc">
                    <p v-for="d in spell.info.desc" :key="d">
                        {{ d }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['classSpells']),
    },
};
</script>
