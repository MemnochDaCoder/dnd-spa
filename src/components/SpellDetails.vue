<template>
    <div v-if="spell">
        <small style="padding: 10px;">Details:</small>
        <table class="table table-striped spell-detail">
            <tr>
                <th>Index:</th>
                <td>{{ spell.index }}</td>
            </tr>
            <tr>
                <th>Name:</th>
                <td>{{ spell.name }}</td>
            </tr>
            <tr>
                <th>Description:</th>
                <td>
                    <ul>
                        <li v-for="item in spell.desc" :key="item">{{ item }}</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="spell.higher_level">
                <th>Higher Level:</th>
                <td>
                    <ul>
                        <li v-for="item in spell.higher_level" :key="item">{{ item }}</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="spell.range">
                <th>Range:</th>
                <td>{{ spell.range }}</td>
            </tr>
            <tr>
                <th>Components:</th>
                <td>
                    <span v-for="c in spell.components" :key="c" class="badge bg-primary">{{ c }}</span>
                </td>
            </tr>
            <tr v-if="spell.material">
                <th>Material:</th>
                <td>{{ spell.material }}</td>
            </tr>
            <tr>
                <th>Ritual:</th>
                <td>{{ spell.ritual }}</td>
            </tr>
            <tr>
                <th>Duration:</th>
                <td>{{ spell.duration }}</td>
            </tr>
            <tr>
                <th>Concentration:</th>
                <td>{{ spell.concentration }}</td>
            </tr>
            <tr>
                <th>Casting Time:</th>
                <td>{{ spell.casting_time }}</td>
            </tr>
            <tr>
                <th>Level:</th>
                <td>{{ spell.level }}</td>
            </tr>
            <tr v-if="spell.damage && spell.damage.damage_type">
                <th>Damage Type:</th>
                <td>
                    <span v-for="dt in spell.damage.damage_type" :key="dt" class="badge bg-info">{{ dt }}</span>
                </td>
            </tr>
            <tr v-if="spell.damage && spell.damage.damage_at_slot_level">
                <th>Damage at Slot Level:</th>
                <td>
                    <div v-for="(value, key) in spell.damage.damage_at_slot_level" :key="key">
                        Slot Level {{ key }}: {{ value }}
                    </div>
                </td>
            </tr>
            <tr v-if="spell.dc && spell.dc.dc_type">
                <th>DC:</th>
                <td>
                    <span v-for="(value, key) in spell.dc.dc_type" :key="value" class="badge bg-info">{{ key }}: {{ value
                    }}</span>
                    DC Success: {{ spell.dc.dc_success }}
                </td>
            </tr>
            <tr>
                <th>Area of Effect:</th>
                <td>
                    <span v-for="(value, key) in spell.area_of_effect" :key="value" class="badge bg-success">{{ key }}: {{
                        value }}</span>
                </td>
            </tr>
            <tr>
                <th>School:</th>
                <td>
                    <span v-for="(value, key) in spell.school" :key="value" class="badge bg-warning">{{ key }}: {{ value
                    }}</span>
                </td>
            </tr>
            <tr>
                <th>Classes:</th>
                <td>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sc in spell.classes" :key="sc.index">
                                <td>{{ sc.index }}</td>
                                <td>{{ sc.name }}</td>
                                <td>{{ sc.url }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <th>Subclasses:</th>
                <td>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Name</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sc in spell.subclasses" :key="sc.index">
                                <td>{{ sc.index }}</td>
                                <td>{{ sc.name }}</td>
                                <td>{{ sc.url }}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <th>URL:</th>
                <td>{{ spell.url }}</td>
            </tr>
        </table>
    </div>
    <div v-else>
        <p>No spell selected.</p>
        <img src="https://media.tenor.com/zJCAajYqz1gAAAAC/dancing-dragon-wiggle.gif" />
    </div>
</template>
  
<script>
export default {
    name: 'SpellDetails',
    props: {
        spell: {
            type: Object,
            default: null,
        },
    },
    methods: {
        capitalize(str) {
            if (str[0] === undefined) return str;
            return str[0].toUpperCase() + str.slice(1);
        },
    },
};
</script>
  
<style>
.spell-detail th {
    padding: 10px;
    font-family: "Open Sans";
    font-variant: small-caps;
    font-size: 15px;
    text-transform: capitalize;
}

.spell-detail th:first-letter {
    font-size: 20px;
    font-weight: bold;
}
</style>
  