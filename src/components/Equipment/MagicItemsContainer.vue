<template>
    <div>
        <br />
        <div class="btn-group">
            <br />
            <button v-for="letter in alphabet" :key="letter" class="btn btn-outline-dark" @click="scrollToSection(letter)">
                {{ letter }}
            </button>
        </div>
        <br />
        <br />
        <form class="row g-3" @submit.prevent="searchMagicItems"
            style="display: flex; align-items: center; justify-content: center;">
            <div class="col-auto">
                <label for="search" class="form-label" value="Magic Item"></label>
                <input type="text" class="form-control" id="search" v-model="searchQuery"
                    placeholder="Search magic items..." />
            </div>
            <div class="col-auto" style="padding-top: 40px;">
                <button class="btn btn-outline-info mb-3" type="submit">Search</button>
            </div>
        </form>
        <br />
        <br />
        <div v-if="filteredMagicItems && filteredMagicItems.length > 0" ref="magicItemList">
            <div v-for="letter in alphabet" :key="letter">
                <h3 class="mb-3" :id="`section-${letter}`" :data-letter="letter">
                    {{ letter }}
                </h3>
                <ul class="list-group">
                    <li class="list-group-item" v-for="magicItem in filteredMagicItems" :key="magicItem.index"
                        :data-item-name="magicItem.name">
                        <button class="btn btn-outline-info" type="button"
                            @click="toggleMagicItemDetail(magicItem.url, magicItem.index)">
                            {{ magicItem.name }}
                        </button>
                        <div v-if="magicItemDetail && selectedMagicItem === magicItem.index">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Equipment Category</th>
                                        <th scope="col">Rarity</th>
                                        <th scope="col"
                                            v-if="magicItemDetail.variants && magicItemDetail.variants.length > 0">Variants
                                        </th>
                                        <th scope="col" v-if="magicItemDetail.desc && magicItemDetail.desc.length > 0">
                                            Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ magicItemDetail.name }}</td>
                                        <td>{{ magicItemDetail.equipment_category.name }}</td>
                                        <td>{{ magicItemDetail.rarity.name }}</td>
                                        <td v-if="magicItemDetail.variants && magicItemDetail.variants.length">
                                            <p v-for="variant in magicItemDetail.variants" :key="variant">
                                                {{ variant.name }}
                                            </p>
                                        </td>
                                        <td v-if="magicItemDetail.desc && magicItemDetail.desc.length > 0">
                                            <p v-for="d in magicItemDetail.desc" :key="d">{{ d }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-outline-info" type="button" @click="scrollToItem(variant.name)"
                                v-for="variant in magicItemDetail.variants" :key="variant">
                                {{ variant.name }}
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else>
            No magic items found.
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedMagicItem: null,
            alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            searchQuery: '',
        };
    },
    computed: {
        ...mapGetters(['magicItemList', 'magicItemDetail']),
        filteredMagicItems() {
            if (this.searchQuery) {
                return this.magicItemList.results.filter(magicItem =>
                    magicItem.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            } else {
                return this.magicItemList.results;
            }
        },
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        scrollToSection(letter) {
            const element = this.$el.querySelector(`[data-letter="${letter}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        async toggleMagicItemDetail(url, index) {
            if (this.selectedMagicItem === index) {
                this.selectedMagicItem = null;
            } else {
                await this.fetchDetailsByUrl({
                    url: url,
                    type: 'magic_item_detail',
                });
                this.selectedMagicItem = index;
            }
        },
        scrollToItem(itemName) {
            const listContainer = this.$refs.magicItemList; // Get the reference to the list container
            const itemElement = listContainer.querySelector(
                `[data-item-name="${itemName}"]`
            ); // Find the item with the specified name
            if (itemElement) {
                itemElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the item
            }
        },
    },
    mounted() {
        this.$store.dispatch('fetchDetailsByUrl', {
            url: '/api/magic-items/',
            type: 'magic_item_list',
        });
    },
};
</script>
  