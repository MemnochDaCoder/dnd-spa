<template>
    <div v-if="equipmentDetails">
        <div v-if="equipmentDetails.equipment_category.index === 'tools'">
            <div>
                <h4>{{ equipmentDetails.name }}</h4>
                <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
                <p><strong>Tool Category:</strong> {{ equipmentDetails.tool_category }}</p>
                <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{ equipmentDetails.cost.unit }}</p>
                <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
                <p v-for="description in equipmentDetails.desc" :key="description">{{ description }}</p>
            </div>
        </div>
        <div v-else>
            <h4>{{ equipmentDetails.name }}</h4>
            <p><strong>Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
            <p><strong>Weapon Category:</strong> {{ equipmentDetails.weapon_category }}</p>
            <p><strong>Weapon Range:</strong> {{ equipmentDetails.weapon_range }}</p>
            <p><strong>Category Range:</strong> {{ equipmentDetails.category_range }}</p>
            <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{ equipmentDetails.cost.unit }}</p>
            <div v-if="equipmentDetails.damage">
                <p><strong>Damage:</strong> {{ equipmentDetails.damage.damage_dice }}</p>
                <p><strong>Damage Type:</strong> {{ equipmentDetails.damage.damage_type.name }}</p>
            </div>
            <p><strong>Range:</strong> {{ equipmentDetails.range.normal }}</p>
            <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
            <h5>Properties:</h5>
            <ul>
                <li v-for="property in equipmentDetails.properties" :key="property.index">
                    {{ property.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['equipmentDetails']),
    },
    props: {
        equipmentDetails: {
            type: Object,
            required: true,
        },
    },
};
</script>
  