import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import MultiSelect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

const app = createApp(App);
app.use(router);
app.use(store);
app.component('MultiSelect', MultiSelect);

app.mount('#app');
