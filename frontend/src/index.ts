import { createApp } from 'vue'
import Container from "./pages/Container.vue";
import { router } from './router';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

createApp(Container).use(router).mount('#app')
