<template v-if="weaponDetails">
    <h5>{{ weaponDetails.name }}</h5>
    <p v-if="weaponDetails.equipment_category">
        <strong>Category:</strong> {{
            weaponDetails.equipment_category.name }}
    </p>
    <p v-if="weaponDetails.weapon_range">
        <strong>Weapon Range:</strong> {{ weaponDetails.weapon_range }}
    </p>
    <p v-if="weaponDetails.quantity && weaponDetails.cost">
        <strong>Cost:</strong> {{ weaponDetails.cost.quantity }} {{
            weaponDetails.cost.unit }}
    </p>
    <p v-if="weaponDetails.damage && weaponDetails.damage.damage_dice">
        <strong>Damage:</strong> {{ weaponDetails.damage.damage_dice }}
        {{
            weaponDetails.damage.damage_type.name }}
    </p>
    <p v-if="weaponDetails.range"><strong>Range:</strong> {{
        weaponDetails.range.normal }}</p>
    <p v-if="weaponDetails.weight"><strong>Weight:</strong> {{
        weaponDetails.weight }}</p>

    <div v-if="weaponDetails.properties && weaponDetails.properties.length > 0">
        <p><strong>Properties:</strong></p>
        <ul>
            <li v-for="property in weaponDetails.properties" :key="property.index" class="btn btn-outline-dark"
                typs="button" @click="fetchWeaponProperties(property.url)">
                {{ property.name }}
            </li>
        </ul>
        <ul v-if="weaponProperties">
            <li class="list-group-item" v-for="d in weaponProperties.desc" :key="d.index">
                {{ d }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['weaponDetails', 'weaponProperties']),
    },
    methods: {
        ...mapActions(['fetchDetailsByUrl']),
        async fetchWeaponProperties(url) {
            await this.fetchDetailsByUrl({ url: url, type: 'weapon_properties' });
        }
    }
};
</script>