import { createApp } from 'vue';
import App from './App.vue';
// vue3
import WujieVue from 'wujie-vue3';
import { setupRouter } from './router';

const app = createApp(App);
setupRouter(app);

app.use(WujieVue).mount('#app');
