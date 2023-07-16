<template v-if="classDetails && classDetails.name">
    <div>
        <table class="table">
            <tbody>
                <tr v-if="classDetails?.hit_die">
                    <th scope="row">Hit Points</th>
                    <td>{{ classDetails.hit_die }}</td>
                </tr>
                <tr v-if="classDetails?.proficiency_choices">
                    <th scope="row">Proficiency Choices</th>
                    <td>
                        <ul>
                            <li v-for="choice in classDetails.proficiency_choices" :key="choice?.type">
                                <strong>{{ choice.desc }}</strong>
                                <div v-if="choice.from.options">
                                    <div class="card" v-for="option in choice.from.options" :key="option.item.index"
                                        type="button" @click="getProficiencyDetail(option.item.url, option.item.index)">
                                        <div class="card-body">
                                            <p class="card-title btn">{{ option.item.name }}</p>
                                            <div v-if="proficiencyDetails &&
                                                this.selectedProficiency.index === option.item.index &&
                                                this.selectedProficiency.showDetails
                                                " class="card-body">
                                                <ProficiencyDetail :proficiencyDetail="proficiencyDetails" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.proficiencies">
                    <th scope="row">Armor Proficiencies</th>
                    <td>
                        <ul>
                            <li v-for="proficiency in classDetails.proficiencies" :key="proficiency.index">
                                <button class="btn" @click="getProficiencyDetail(proficiency.url, proficiency.index)">
                                    {{ proficiency.name }}
                                </button>
                                <div v-if="proficiencyDetails &&
                                    showProficiencyDetails &&
                                    this.selectedProficiency === proficiency.index
                                    ">
                                    <ProficiencyDetail :proficiencyDetail="proficiencyDetails" />
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.saving_throws">
                    <th scope="row">Saving Throws</th>
                    <td>
                        <ul>
                            <li v-for="st in classDetails.saving_throws" :key="st.index">
                                <a :href="st.url">{{ st.name }}</a>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.starting_equipment">
                    <th scope="row">Starting Equipment</th>
                    <td>
                        <ul>
                            <li v-for="equipment in classDetails.starting_equipment" :key="equipment.equipment.index">
                                <button type="button" class="btn btn-link"
                                    @click="openEquipmentModal(equipment.equipment.index)">
                                    {{ equipment.equipment.name }}
                                    <span class="badge bg-secondary">X {{ equipment.equipment.choose }}</span>
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.starting_equipment_options">
                    <th scope="row">Starting Equipment Options</th>
                    <td>
                        <ul>
                            <li v-for="option in classDetails.starting_equipment_options" :key="option.type">
                                <strong>{{ option.desc }}</strong>
                                <ul v-if="option.from.options">
                                    <li v-for="item in option.from.options" :key="item.option_type">
                                        <template v-if="item.option_type === 'multiple'">
                                            <ul>
                                                <li v-for="choice in item.items" :key="choice.option_type">
                                                    <strong>{{ choice.desc }}</strong>
                                                    <ul>
                                                        <li v-for="subItem in choice.from.options"
                                                            :key="subItem.item.index">
                                                            <a :href="subItem.item.url">{{ subItem.item.name }}</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </template>
                                        <template v-else-if="item.option_type === 'counted_reference'">
                                            {{ item.count }}x <a :href="item.of.url">{{ item.of.name }}</a>
                                        </template>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.multi_classing">
                    <th scope="row">Multi-classing</th>
                    <td>
                        <ul v-if="classDetails.multi_classing.prerequisites">
                            <li v-for="prerequisite in classDetails.multi_classing.prerequisites"
                                :key="prerequisite.ability_score.index">
                                {{ prerequisite.ability_score.name }} ({{ prerequisite.minimum_score }} or higher)
                            </li>
                            <li v-if="classDetails.multi_classing.proficiencies">Proficiencies:
                                <ul>
                                    <li v-for="proficiency in classDetails.multi_classing.proficiencies"
                                        :key="proficiency.index">
                                        <a :href="proficiency.url">{{ proficiency.name }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.subclasses">
                    <th scope="row">Subclasses</th>
                    <td>
                        <ul>
                            <li v-for="subclass in classDetails.subclasses" :key="subclass.index">
                                <a :href="subclass.url">{{ subclass.name }}</a>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="classDetails.spellcasting">
                    <th scope="row">Spellcasting</th>
                    <td>
                        <p>Level: {{ classDetails.spellcasting.level }}</p>
                        <p v-if="classDetails.spellcasting_ability">Spellcasting Ability: <a
                                :href="classDetails.spellcasting_ability.url">{{ classDetails.spellcasting_ability.name
                                }}</a></p>
                        <ul>
                            <li v-for="info in classDetails.spellcasting.info" :key="info.name">
                                <strong>{{ info.name }}</strong>
                                <ul>
                                    <li v-for="desc in info.desc" :key="desc">{{ desc }}</li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import ProficiencyDetail from '../Equipment/ProficiencyDetail.vue'

export default {
    data() {
        return {
            selectedProficiency: {},
            showSkillDetail: [],
            showProficiencyDetails: false,
        };
    },
    components: {
        ProficiencyDetail,
    },
    computed: {
        ...mapGetters(['classDetails', 'proficiencyDetails']),
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        async getProficiencyDetail(url, index) {
            this.selectedProficiency = {};
            this.showProficiencyDetails = false;

            await this.$store.dispatch('fetchDetailsByUrl', { url, type: 'proficiency' });

            this.selectedProficiency = { index: index, showDetails: true };

            const proficiency = this.proficiencyDetails[index];
            if (proficiency && proficiency.ability_score) {
                await this.$store.dispatch('fetchDetailsByUrl', { url: proficiency.ability_score.url, type: 'ability' });
            }
            if (this.proficiencyDetails && this.proficiencyDetails.Type && this.proficiencyDetails.Type.search("Skill")) {
                console.log(this.proficiencyDetails.url);
                await this.$store.dispatch('fetchDetailsByUrl', { url: this.proficiencyDetails.url, type: 'skill' });
            }
            if (this.proficiencyDetails && this.proficiencyDetails.Type && this.proficiencyDetails.type.search("Instruments")) {
                await this.$store.dispatch('fetchDetailsByUrl', { url: this.proficiencyDetails.url, type: 'instrument' });
            }
        },
    },
};
</script>
  