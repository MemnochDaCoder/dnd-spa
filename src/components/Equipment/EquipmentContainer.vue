<template>
    <br>
    <div class="btn-group">
        <br>
        <button v-for="letter in alphabet" :key="letter" class="btn btn-outline-dark" @click="scrollToSection(letter)">
            {{ letter }}
        </button>
    </div>
    <br />
    <br />
    <form class="row g-3" @submit.prevent="searchEquipment">
        <div class="col-md-6">
            <label for="search" class="form-label">Equipment Name</label>
            <input type="text" class="form-control" id="search" v-model="searchQuery" placeholder="Search equipment...">
        </div>
        <div class="col-md-6">
            <br />
            <button class="btn btn-outline-dark" type="submit" @click="searchEquipment" @submit.prevent="searchEquipment">Search</button>
        </div>
    </form>
    <br />
    <br />
    <div v-if="equipmentList">
        <!-- Loop through each alphabetical section -->
        <p>Equipment Count: {{ equipmentList.count }}</p>
        <div v-for="section in groupedEquipmentList" :key="section.letter">
            <h3 :data-letter="section.letter">{{ section.letter }}</h3>
            <ul class="list-group">
                <li class="list-group-item" v-for="eq in section.items" :key="eq.index">
                    {{ eq.name }}<br />
                    <button class="btn btn-outline-dark" type="button"
                        @click="toggleEquipmentDetail(eq.url, eq.index)">Equipment
                        Detail</button>
                    <template
                        v-if="equipmentDetails && selectedEquipment === eq.index && equipmentDetails.equipment_category && equipmentDetails.equipment_category.index === 'tools'">
                        <div class="container mt-4" v-if="selectedEquipment === eq.index" style="padding: 10px;">
                            <h2>{{ equipmentDetails.name }}</h2>
                            <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
                            <p><strong>Tool Category:</strong> {{ equipmentDetails.tool_category }}</p>
                            <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{
                                equipmentDetails.cost.unit }}</p>
                            <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
                            <p><strong>Description:</strong></p>
                            <ul>
                                <li v-for="descItem in equipmentDetails.desc" :key="descItem">{{ descItem }}</li>
                            </ul>
                            <p>Cost:</p>
                            <p>{{ equipmentDetails.cost.quantity }}{{ equipmentDetails.cost.unit }}</p>
                            <p>Weight: {{ equipmentDetails.weight }}</p>
                            <div v-if="equipmentDetails.contents && equipmentDetails.contents.length > 0">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="content in equipmentDetails.contents" :key="content">
                                        {{ content }}
                                    </li>
                                </ul>
                            </div>
                            <div v-if="equipmentDetails.properties && equipmentDetails.properties.length > 0">
                                <ul class="list-group">
                                    <li v-for="properties in equipmentDetails.properties" :key="properties">
                                        {{ properties }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                    <template
                        v-else-if="equipmentDetails && selectedEquipment === eq.index && equipmentDetails.equipment_category && equipmentDetails.equipment_category.index === 'mounts-and-vehicles'">
                        <div class="container mt-4" v-if="selectedEquipment === eq.index" style="padding: 10px;">
                            <p><strong>Vehicle Category:</strong> {{ equipmentDetails.vehicle_category }}</p>
                            <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
                            <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{
                                equipmentDetails.cost.unit }}</p>
                            <p v-if="!equipmentDetails.equipment_category.index.search('barding')">Speed: {{
                                equipmentDetails.speed.quantity }} {{ equipmentDetails.speed.unit }}</p>
                            <p><strong>Capacity:</strong> {{ equipmentDetails.capacity }}</p>
                            <p v-if="equipmentDetails.desc && equipmentDetails.desc.length > 0">
                                <strong>Description:</strong>
                            </p>
                            <ul>
                                <li v-for="descItem in equipmentDetails.desc" :key="descItem">{{ descItem }}</li>
                            </ul>
                            <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }}{{ equipmentDetails.cost.unit }}
                            </p>
                            <p v-if="equipmentDetails.weight">Weight: {{ equipmentDetails.weight }}</p>
                            <div v-if="equipmentDetails.contents && equipmentDetails.contents.length > 0">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="content in equipmentDetails.contents" :key="content">
                                        {{ content }}
                                    </li>
                                </ul>
                            </div>
                            <div v-if="equipmentDetails.properties && equipmentDetails.properties.length > 0">
                                <ul class="list-group">
                                    <li v-for="properties in equipmentDetails.properties" :key="properties">
                                        {{ properties }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                    <template
                        v-else-if="equipmentDetails && selectedEquipment === eq.index && equipmentDetails.equipment_category && equipmentDetails.equipment_category.index === 'weapon'">
                        <WeaponDetail />
                    </template>
                    <template
                        v-else-if="equipmentDetails && selectedEquipment === eq.index && equipmentDetails.equipment_category && equipmentDetails.equipment_category.index === 'armor'">
                        <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
                        <p><strong>Armor Category: {{ equipmentDetails.armor_category }}</strong></p>
                        <p><strong>AC:</strong></p>
                        <p>Base: {{ equipmentDetails.armor_class.base }}</p>
                        <p>Dex Bonus?: {{ equipmentDetails.armor_class.dex_bonus }}</p>
                        <p><strong>Strength Minimum: {{ equipmentDetails.str_minimum }}</strong></p>
                        <p><strong>Stealth Disadvantage?: {{ equipmentDetails.stealth_disadvantage }}</strong></p>
                        <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{ equipmentDetails.cost.unit }}</p>
                        <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
                        <p><strong>Description:</strong></p>
                        <ul>
                            <li v-for="descItem in equipmentDetails.desc" :key="descItem">{{ descItem }}</li>
                        </ul>
                        <p>Cost:</p>
                        <p>{{ equipmentDetails.cost.quantity }}{{ equipmentDetails.cost.unit }}</p>
                        <p>Weight: {{ equipmentDetails.weight }}</p>
                        <div v-if="equipmentDetails.contents && equipmentDetails.contents.length > 0">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="content in equipmentDetails.contents" :key="content">
                                    {{ content }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="equipmentDetails.properties && equipmentDetails.properties.length > 0">
                            <ul class="list-group">
                                <li v-for="property in equipmentDetails.properties" :key="property">
                                    {{ property }}
                                </li>
                            </ul>
                        </div>
                        <div v-if="equipmentDetails.special && equipmentDetails.special.length > 0">
                            <ul class="list-group">
                                <li v-for="s in equipmentDetails.special" :key="s">
                                    {{ s }}
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template
                        v-else-if="equipmentDetails && selectedEquipment === eq.index && equipmentDetails.equipment_category.index === 'adventuring-gear'">
                        <div class="container mt-4" v-if="selectedEquipment === eq.index" style="padding: 10px;">
                            <h2>{{ equipmentDetails.name }}</h2>
                            <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
                            <p><strong>Gear Category:</strong> {{ equipmentDetails.gear_category.name }}</p>
                            <p><strong>Description:</strong></p>
                            <ul>
                                <li v-for="descItem in equipmentDetails.desc" :key="descItem">{{ descItem }}</li>
                            </ul>
                            <p><strong>Special:</strong></p>
                            <ul>
                                <li v-for="specialItem in equipmentDetails.special" :key="specialItem">{{ specialItem }}
                                </li>
                            </ul>
                            <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{ equipmentDetails.cost.unit }}
                            </p>
                            <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
                            <div v-if="equipmentDetails.contents && equipmentDetails.contents.length > 0">
                                <p><strong>Contents:</strong></p>
                                <ul>
                                    <li v-for="contentItem in equipmentDetails.contents" :key="contentItem.index">{{
                                        contentItem.name }}
                                    </li>
                                </ul>
                            </div>
                            <div v-if="equipmentDetails.properties && equipmentDetails.properties.length > 0">
                                <p><strong>Properties:</strong></p>
                                <ul>
                                    <li v-for="propertyItem in equipmentDetails.properties" :key="propertyItem.index">{{
                                        propertyItem.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WeaponDetail from './WeaponDetail.vue'

export default {
    data() {
        return {
            selectedEquipment: null,
            selectedDamageType: null,
            alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            searchQuery: '',
            filteredEquipmentList: null,
        };
    },
    components: {
        WeaponDetail,
    },
    computed: {
        ...mapGetters(['equipmentList', 'equipmentDetails', 'damageTypeDetails']),
        groupedEquipmentList() {
            return this.groupEquipmentList(this.filteredEquipmentList || this.equipmentList);
        },
    },
    mounted() {
        this.$store.dispatch('fetchDetailsByUrl', {
            url: '/api/equipment/',
            type: 'equipment_list',
        });
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        async toggleEquipmentDetail(url, index) {
            if (this.selectedEquipment === index) {
                this.selectedEquipment = null;
            }
            else {
                await this.fetchDetailsByUrl({ url: url, type: 'equipment' });
                this.selectedEquipment = index;
                console.log(this.selectedEquipment);
            }
        },
        async fetchDamageTypeDetail(url, index) {
            if (this.selectedDamageType === index) {
                this.selectedDamageType = null;
            }
            else {
                await this.fetchDetailsByUrl({ url: url, type: 'damage_type' });
                this.selectedDamageType = index;
            }
        },
        groupEquipmentList(list) {
            if (!list || list.length <= 0 || list.results === undefined) return [];
            const sortedList = list.results.slice().sort((a, b) => a.name.localeCompare(b.name));

            const grouped = [];
            let currentLetter = '';
            let currentSection = null;

            for (const eq of sortedList) {
                const firstLetter = eq.name.charAt(0).toUpperCase();

                if (firstLetter !== currentLetter) {
                    currentLetter = firstLetter;
                    currentSection = { letter: currentLetter, items: [] };
                    grouped.push(currentSection);
                }

                currentSection.items.push(eq);
            }

            return grouped;
        },
        scrollToSection(letter) {
            const element = document.querySelector(`[data-letter="${letter}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        searchEquipment() {
            if (this.searchQuery) {
                const filteredEquipment = this.equipmentList.results.filter((eq) =>
                    eq.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );

                // Update the filteredEquipmentList with the filtered results
                this.filteredEquipmentList = { ...this.equipmentList, results: filteredEquipment };
            } else {
                // If the search query is empty, reset the filteredEquipmentList to null
                this.filteredEquipmentList = null;
            }

            // Clear the selectedEquipment and selectedDamageType when searching
            this.selectedEquipment = null;
            this.selectedDamageType = null;
        },
    },
}
</script>