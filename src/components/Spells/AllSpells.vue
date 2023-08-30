<template>
    <div class="all-spells">
        <div v-if="spells && spells.length">
            <div class="spell-index">
                <h3 class="index-title">Index</h3>
                <div class="index-buttons">
                    <div class="btn-group" role="group" ref="buttonGroup">
                        <button v-for="letter in alphabet" :key="letter" type="button"
                            class="btn btn-outline-primary index-button" @click="scrollToSection(letter)">
                            {{ letter }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="list-group">
                <div v-for="letter in alphabet" :key="letter">
                    <h2 class="section-heading" :id="letter">{{ letter }}</h2>
                    <button class="list-group-item list-group-item-action btn" v-for="spell in getSpellsByLetter(letter)"
                        :key="spell.index" @click="toggleSpellDetails(spell)">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ spell.name }}</h5>
                            <small v-if="spell.level">Level: {{ spell.level }}</small>
                        </div>
                        <p class="mb-1" v-if="isSpellDetailVisible(spell)">
                            <SpellDetails :spell="spellDetails"></SpellDetails>
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import SpellDetails from './SpellDetails.vue';

export default {
    name: 'AllSpells',
    data() {
        return {
            expandedSpells: null,
        }
    },
    components: {
        SpellDetails,
    },
    computed: {
        ...mapGetters(['spells', 'currentSpellIndex', 'spellDetails']),
        alphabet() {
            const letters = new Set();
            this.spells.forEach((spell) => {
                if (spell.name) {
                    const firstLetter = spell.name.charAt(0).toUpperCase();
                    letters.add(firstLetter);
                }
            });
            return Array.from(letters).sort();
        },
        isSpellDetailsVisible() {
            return this.spellDetails && this.currentSpellIndex === this.spellDetails.index;
        },
    },
    methods: {
        toggleSpellDetails(spell) {
            if (this.expandedSpellIndex === spell.index) {
                this.expandedSpellIndex = null;
                this.$store.dispatch('fetchSpellDetails', null);
            } else {
                this.expandedSpellIndex = spell.index;
                this.$store.dispatch('fetchSpellDetails', spell.index);
            }
        },
        isSpellDetailVisible(spell) {
            return this.isSpellDetailsVisible && this.expandedSpellIndex === spell.index;
        },
        getSpellsByLetter(letter) {
            return this.spells.filter((spell) => spell.name.charAt(0).toUpperCase() === letter);
        },
        scrollToSection(letter) {
            const sectionId = `#${letter}`;
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        },
        wrapButtonsOnOverflow() {
            const buttonGroup = this.$refs.buttonGroup;
            if (buttonGroup) {
                const buttons = buttonGroup.querySelectorAll('.index-button');
                let buttonWidth = 0;
                buttons.forEach((button) => {
                    buttonWidth += button.offsetWidth;
                });
                const buttonGroupWidth = buttonGroup.offsetWidth;
                if (buttonWidth > buttonGroupWidth) {
                    buttonGroup.classList.add('button-group-wrap');
                } else {
                    buttonGroup.classList.remove('button-group-wrap');
                }
            }
        },
    },
    mounted() {
        this.wrapButtonsOnOverflow();
        window.addEventListener('resize', this.wrapButtonsOnOverflow);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.wrapButtonsOnOverflow);
    },
};
</script>
  
<style>
.all-spells {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    /* Adjust the maximum width as needed */
    margin: 0 auto;
}

.spell-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.index-title {
    margin: 0;
    font-size: 20px;
}

.index-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.button-group-wrap {
    flex-wrap: nowrap;
    overflow-x: auto;
}

.index-button {
    margin: 5px;
}

.section-heading {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
}

.list-group {
    width: 100%;
}

.list-group-item {
    border-radius: 0;
    border: none;
    cursor: pointer;
}

.list-group-item:hover {
    background-color: #f0f0f0;
}

.small {
    font-size: 12px;
    color: gray;
}
</style>
  