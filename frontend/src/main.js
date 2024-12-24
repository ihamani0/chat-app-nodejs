import { createApp } from 'vue'
import './style.css'
import './axios'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes/index'
import {useauthStore} from './stores/authStore'

const app = createApp(App);
app.use(createPinia())
app.use(router)


const authStore = useauthStore();

authStore.verifyAuth();
app.mount('#app')
