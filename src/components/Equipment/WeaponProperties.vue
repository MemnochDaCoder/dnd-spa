<template v-if="weaponProperties && weaponProperties.name">
    <button type="button" class="btn btn-outline-dark" @click="fetchWeaponProperties(weaponProperties.url)">{{ weaponProperties.name }}</button>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="d in weaponProperties.desc" :key="d.index">{{ d }}</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed:{
        ...mapGetters['weaponProperties']
    },
}
</script>