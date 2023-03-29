import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";

import "vue-toastification/dist/index.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


createApp(App).use(router).use(Toast).mount('#app')
