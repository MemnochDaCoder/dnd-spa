<template>
    <div v-if="equipmentDetails">
        <h4>{{ equipmentDetails.name }}</h4>
        <p><strong>Equipment Category:</strong> {{ equipmentDetails.equipment_category.name }}</p>
        <p><strong>Cost:</strong> {{ equipmentDetails.cost.quantity }} {{ equipmentDetails.cost.unit }}</p>
        <p><strong>Weight:</strong> {{ equipmentDetails.weight }}</p>
        <p v-for="description in equipmentDetails.desc" :key="description">{{ description }}</p>
    </div>
</template>
  
<script>
export default {
    props: {
        equipmentDetails: {
            type: Object,
            required: true,
        },
    },
};
</script>
  