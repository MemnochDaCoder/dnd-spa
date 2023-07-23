<template>
    <div v-if="weaponDetails">
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
        <p v-if="weaponDetails.properties && weaponDetails.properties.length > 0">
            <strong>Properties:</strong>
        </p>
        <ul v-if="weaponDetails.properties && weaponDetails.properties.length > 0">
            <li v-for="property in weaponDetails.properties" :key="property.index">
                {{ property.name }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['weaponDetails']),
    }
};
</script>
  