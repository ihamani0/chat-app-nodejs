import { createRouter, createWebHistory } from "vue-router"


import { useauthStore } from "../stores/authStore";

import Register from "../components/auth/RegisterUser.vue";
import Login from "../components/auth/LoginUser.vue";
import Chat from "../components/ChatApp.vue";




const routes = [
    { path: '/', redirect: '/chat' },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    {
        path: "/chat",
        component: Chat,
        beforeEnter: (to, from, next) => {
            const authStore = useauthStore();
            if (!authStore.isAuthenticated) next("/login");
            else next();
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;