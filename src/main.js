import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'


import axios from 'axios'
import VueAxios from 'vue-axios'


import Swal from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App).use(router)
app.use(Swal);
app.use(VueAxios, { $request: axios })
app.mount('#app')

