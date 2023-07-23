<template v-if="equipmentOption">
    <div v-for="option in equipmentOption" :key="option.desc">
        <p>Choose: {{ option.choose }}</p>
        <p>Description: {{ option.desc }}</p>
    </div>
    <div v-for="oo in option.from.options" :key="oo.option_type">
        <p>Count: {{ oo.count }}</p>
        <div v-for="ooo in oo.of" :key="ooo.index">
            <div v-if="ooo.url.includes === 'weapon'"><Weapon :weaponDetail="equipmentOption" /></div>
        </div>
    </div>
</template>

<script>
import WeaponDetail from 'Weapon.vue';

export default {
    components: {
        WeaponDetail,
    },
    props:{
        equipmentOption(){
            type: Object,
            required: true,
        },
    },
};
</script>