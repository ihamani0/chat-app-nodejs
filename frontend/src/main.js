import { createApp } from 'vue'
import './style.css'
import './axios'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes/index'


createApp(App).use(createPinia()).use(router).mount('#app')
