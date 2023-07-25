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
    <form class="row g-3" @submit.prevent="searchMagicItems">
        <div class="col-md-6">
            <label for="search" class="form-label">Magic Item Name</label>
            <input type="text" class="form-control" id="search" v-model="searchQuery" placeholder="Search magic items...">
        </div>
        <div class="col-md-6">
            <br />
            <button class="btn btn-outline-dark" type="submit" @click="searchEquipment" @submit.prevent="searchEquipment">Search</button>
        </div>
    </form>
    <br />
    <br />
    <div v-if="magicItemList">
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    computed: {
        ...mapGetters(['equipmentList', 'equipmentDetails', 'damageTypeDetails']),
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        scrollToSection(letter) {
            const element = document.querySelector(`[data-letter="${letter}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
};
</script>