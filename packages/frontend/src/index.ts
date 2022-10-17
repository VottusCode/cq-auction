import { createApp } from 'vue'
import Container from "./pages/Container.vue";
import { router } from './router';

import './assets/app.scss';

createApp(Container).use(router).mount('#app')
