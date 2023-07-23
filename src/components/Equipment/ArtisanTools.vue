<template>
    <div v-if="tool">
        <h4>{{ tool.name }}</h4>
        <p>Type: {{ tool.type }}</p>
        <div v-if="tool.classes && tool.classes.length > 0">
            <h5>Classes:</h5>
            <ul>
                <li v-for="classItem in tool.classes" :key="classItem.index">
                    <a :href="classItem.url">{{ classItem.name }}</a>
                </li>
            </ul>
        </div>
        <div v-if="tool.races && tool.races.length > 0">
            <h5>Races:</h5>
            <ul>
                <li v-for="race in tool.races" :key="race.index">{{ race.name }}</li>
            </ul>
        </div>
        <div v-if="tool.reference">
            <h5>Reference:</h5>
            <EquipmentDetail />
        </div>
    </div>
</template>
  
<script>
import EquipmentDetail from '../Equipment/EquipmentDetail.vue';

export default {
    props: {
        tool: {
            type: Object,
            required: true,
        },
    },
    components: {
        EquipmentDetail,
    },
};
</script>
  