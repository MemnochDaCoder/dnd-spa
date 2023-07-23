<template>
    <div v-if="instrumentDetails">
        <div v-if="instrumentDetails.equipment_category && instrumentDetails.equipment_category.index === 'tools'">
            <div>
                <h4>{{ instrumentDetails.name }}</h4>
                <p><strong>Equipment Category:</strong> {{ instrumentDetails.equipment_category.name }}</p>
                <p><strong>Tool Category:</strong> {{ instrumentDetails.tool_category }}</p>
                <p><strong>Cost:</strong> {{ instrumentDetails.cost.quantity }} {{ instrumentDetails.cost.unit }}</p>
                <p><strong>Weight:</strong> {{ instrumentDetails.weight }}</p>
                <p v-for="description in instrumentDetails.desc" :key="description">{{ description }}</p>
            </div>
        </div>
        <div v-else>
            <p>Placeholder</p>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['instrumentDetails']),
    },
    // props: {
    //     instrumentDetails: {
    //         type: Object,
    //         required: true,
    //     },
    // },
};
</script>
  