<template>
    <div v-if="classDetails && classDetails.name">
        <div>
            <table class="table">
                <tbody>
                    <tr v-if="classDetails?.hit_die">
                        <th scope="row">Hit Points</th>
                        <td>{{ classDetails.hit_die }}</td>
                    </tr>
                    <tr v-if="classDetails && classDetails.proficiency_choices">
                        <th scope="row">Proficiency Choices</th>
                        <td>
                            <ul>
                                <li v-for="choice in classDetails.proficiency_choices" :key="choice?.type">
                                    <strong>{{ choice.desc }}</strong>
                                    <div v-if="choice.from?.options">
                                        <div class="card" v-for="option in choice.from.options" :key="option.item.index"
                                            type="button" @click="getProficiencyDetail(option.item.url, option.item.index)">
                                            <div class="card-body">
                                                <p v-if="option.item.name" class="card-title btn">{{ option.item.name }}</p>
                                                <div v-if="selectedProficiency && selectedProficiency.index === option.item.index"
                                                    class="card-body">
                                                    <div v-if="proficiencyDetails">
                                                        <p>{{ proficiencyDetails.name }}</p>
                                                        <p>Index: {{ proficiencyDetails.index }}</p>
                                                        <p>Type: {{ proficiencyDetails.type }}</p>
                                                        <div
                                                            v-if="proficiencyDetails && proficiencyDetails.classes && proficiencyDetails.classes.length > 0">
                                                            <p>Classes:</p>
                                                            <ul>
                                                                <li v-for="classItem in proficiencyDetails.classes"
                                                                    :key="classItem.index">{{ classItem.name }}</li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            v-if="proficiencyDetails.races && proficiencyDetails.races.length > 0">
                                                            <p>Races:</p>
                                                            <ul>
                                                                <li v-for="race in proficiencyDetails.races"
                                                                    :key="race.index">{{ race.name }}</li>
                                                            </ul>
                                                        </div>
                                                        <div
                                                            v-if="proficiencyDetails.reference && proficiencyDetails.reference.name">
                                                            <p>Reference:</p>
                                                            <button class="btn btn-outline-dark" type="button"
                                                                @click="fetchSkillDetail(proficiencyDetails.reference.url)">
                                                                {{ proficiencyDetails.reference.name }}
                                                            </button>
                                                            <div v-if="skillDetails">
                                                                <ul class="list-group">
                                                                    <li class="list-group-item"
                                                                        v-for="d in skillDetails.desc" :key="d">
                                                                        {{ d }}
                                                                    </li>
                                                                </ul>
                                                                <div v-if="skillDetails.ability_score">
                                                                    <p>Ability Score:</p>
                                                                    <button class="btn btn-outline-dark" type="button"
                                                                        @click="fetchAbilityScoreDetail(skillDetails.ability_score.url)">
                                                                        {{ skillDetails.ability_score.name }}
                                                                    </button>
                                                                    <div v-if="abilityScoreDetails">
                                                                        <h3>{{ abilityScoreDetails.full_name }}</h3>
                                                                        <ul class="list-group">
                                                                            <li class="list-group-item"
                                                                                v-for="d in abilityScoreDetails.desc"
                                                                                :key="d">
                                                                                {{ d }}
                                                                            </li>
                                                                        </ul>
                                                                        <ul class="list-group">
                                                                            <li class="list-group-item"
                                                                                v-for="skill in abilityScoreDetails.skills"
                                                                                :key="skill.index">
                                                                                {{ skill.name }}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                    <div class="card" type="button" @click="toggleEquipmentDetail(proficiency.index)">
                                        <div class="card-body">{{ proficiency.name }}</div>
                                    </div>
                                    <div v-if="selectedProficiency && selectedProficiency.index === proficiency.index">
                                        <div v-html="renderProficiencyDetails(proficiencyDetails)"></div>
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="classDetails.starting_equipment">
                        <th scope="row">Starting Equipment</th>
                        <td>
                            <ul>
                                <li v-for="equipment in classDetails.starting_equipment" :key="equipment.equipment.index">
                                    <div class="card" type="button"
                                        @click="toggleEquipmentDetail(equipment.equipment.index)">
                                        <div class="card-body" v-if="equipment.equipment.name && equipment.quantity">
                                            {{ equipment.equipment.name }} x {{ equipment.quantity }}
                                            <div v-if="selectedEquipmentIndex === equipment.equipment.index">
                                                <EquipmentDetail />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="classDetails.starting_equipment_options">
                        <th scope="row">Starting Equipment Options</th>
                        <td>
                            <ul>
                                <li v-for="(option, optionIndex) in classDetails.starting_equipment_options"
                                    :key="optionIndex">
                                    <strong v-if="option" type="button" class="btn btn-outline-dark"
                                        @click="toggleEquipmentOptions(optionIndex)">{{ option.type.toUpperCase()
                                        }}</strong>
                                    <ul v-if="selectedEquipmentOptionIndex === optionIndex">
                                        <li v-for="item in option.from.options" :key="item.option_type">
                                            <div v-if="item.option_type === 'counted_reference'">
                                                <div class="card" @click="fetchWeaponDetail(item.of.url)">
                                                    {{ item.of.name }}
                                                </div>
                                                <WeaponDetail />
                                            </div>
                                            <div v-else-if="item.option_type === 'choice'">
                                                <div class="card"
                                                    v-for="(choiceOption, choiceIndex) in item.choice.from.options"
                                                    :key="choiceIndex" @click="getEquipmentDetail(choiceOption.url)">
                                                    <EquipmentDetail />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="classDetails.subclasses">
                        <th>Subclass Options:</th>
                        <td>
                            <ul class="list-group" v-for="subclass in classDetails.subclasses" :key="subclass.index">
                                <li class="btn list-group-item btn-outline-dark" type="button"
                                    v-if="subclass && subclass.name" @click="fetchSubclassDetail(subclass.url)">{{
                                        subclass.name }}</li>
                            </ul>
                            <div v-if="subclassDetails && subclassDetails.name">
                                <div>
                                    <p>Subclass: {{ subclassDetails.name }}</p>
                                    <ul>
                                        <li v-if="subclassDetails.class && subclassDetails.class.name">Class: {{
                                            subclassDetails.class.name }}</li>
                                    </ul>
                                    <p v-if="subclassDetails.subclass_flavor">Subclass Flavor: {{
                                        subclassDetails.subclass_flavor }}</p>
                                    <p>Description:</p>
                                    <ul>
                                        <li v-for="desc in subclassDetails.desc" :key="desc">{{ desc }}</li>
                                    </ul>
                                    <div
                                        v-if="subclassDetails.subclass_levels && subclassDetails.subclass_levels.length > 0">
                                        <button class="btn btn-outline-dark" v-if="subclassDetails.subclass_levels"
                                            @click="fetchSubclassLevelDetail(subclassDetails.subclass_levels)">Subclass
                                            Levels</button>
                                        <ul class="list-group">
                                            <li class="list-group-type" v-for="level in subclassLevels" :key="level">
                                                <p style="padding: 10px;">Level: {{ level.level }}</p>
                                                <ul class="list-group">
                                                    <li class="list-group-item" v-for="f in level.features" :key="f.index">
                                                        <p v-if="f.count">Count: {{ f.count }}</p>
                                                        <button class="btn btn-outline-dark" type="button"
                                                            @click="toggleSelectedFeature(f.index, f.url)">
                                                            {{ f.name }}
                                                        </button>
                                                        <div v-if="feature && selectedFeatureIndex === f.index" style="padding: 10px;">
                                                            <div
                                                                v-if="feature.desc && feature.desc.length > 0">
                                                                <p v-for="d in feature.desc" :key="d">{{ d }}</p>
                                                            </div>
                                                            <div
                                                                v-if="feature.prerequisites && feature.prerequisites.length > 0">
                                                                <p v-for="p in feature.prerequisites" :key="p">{{ p
                                                                }}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>

                                    <div v-if="subclassDetails.spells && subclassDetails.spells.length > 0">
                                        <p>Spells:</p>
                                        <ul>
                                            <li v-for="spell in subclassDetails.spells" :key="spell">{{ spell }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
import EquipmentDetail from '../Equipment/EquipmentDetail.vue';
import WeaponDetail from '../Equipment/WeaponDetail.vue';

export default {
    data() {
        return {
            selectedProficiency: {},
            selectedOption: {},
            selectedEquipmentIndex: null,
            selectedEquipmentOptionIndex: null,
            selectedFeatureIndex: null,
        };
    },
    components: {
        EquipmentDetail,
        WeaponDetail,
    },
    computed: {
        ...mapGetters(['classDetails', 'proficiencyDetails', 'subclassDetails', 'skillDetails', 'abilityScoreDetails', 'subclassLevels', 'subclassFeatures', 'feature']),
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl', 'fetchDetails', 'fetchEquipmentOptions']),
        async getProficiencyDetail(url, index) {
            this.selectedProficiency = {};
            await this.fetchDetailsByUrl({ url, type: 'proficiency' });
            this.selectedProficiency = { index: index, showDetails: true };
        },
        renderProficiencyDetails() {
            if (!this.proficiencyDetails) {
                return ''; // Return an empty string if proficiencyDetails is undefined
            }

            let html = '';
            if (this.proficiencyDetails.desc) {
                html += `<p>${this.proficiencyDetails.desc}</p>`;
            }
            if (
                this.proficiencyDetails.classes &&
                this.proficiencyDetails.classes.length > 0
            ) {
                html += '<h5>Classes:</h5>';
                html += '<ul>';
                this.proficiencyDetails.classes.forEach((classItem) => {
                    if (classItem && classItem.name !== undefined) { // Check if name property is defined
                        html += `<li>${classItem.name}</li>`;
                    }
                });
                html += '</ul>';
            }
            if (this.proficiencyDetails.races && this.proficiencyDetails.races.length > 0) {
                html += '<h5>Races:</h5>';
                html += '<ul>';
                this.proficiencyDetails.races.forEach((race) => {
                    if (race && race.name !== undefined) { // Check if name property is defined
                        html += `<li>${race.name}</li>`;
                    }
                });
                html += '</ul>';
            }
            return html;
        },
        toggleEquipmentDetail(index) {
            if (this.selectedEquipmentIndex === index) {
                this.selectedEquipmentIndex = null;
            } else {
                this.selectedEquipmentIndex = index;
            }
        },
        async fetchWeaponDetail(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'weapon' });
            return data;
        },
        async fetchEquipmentDetail(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'equipment' });
            return data;
        },
        toggleEquipmentOptions(optionIndex) {
            if (this.selectedEquipmentOptionIndex === optionIndex) {
                this.selectedEquipmentOptionIndex = null;
            } else {
                this.selectedEquipmentOptionIndex = optionIndex;
            }
        },
        async fetchSubclassDetail(url) {
            let data = await this.fetchEquipmentOptions({ url: url, type: 'subclass' });
            return data;
        },
        async fetchSkillDetail(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'skill' });
            return data;
        },
        async fetchAbilityScoreDetail(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'ability' });
            return data;
        },
        async fetchSubclassLevelDetail(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'subclass_level' });
            return data;
        },
        async fetchFeatureDetails(url) {
            let data = await this.fetchDetailsByUrl({ url: url, type: 'subclass_features' });
            return data;
        },
        async toggleSelectedFeature(index, url) {
            if (this.selectedFeatureIndex === index) {
                this.selectedFeatureIndex = null;
            } else {
                await this.fetchDetailsByUrl({ url: url, type: 'feature' });
                this.selectedFeatureIndex = index;
            }
        },
    },
};
</script>
  