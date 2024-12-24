import { createRouter, createWebHistory } from "vue-router"


import { useauthStore } from "../stores/authStore";







const routes = [
    { path: '/', redirect: '/chat' },
    { path: "/register", component: () => import('../components/auth/RegisterUser.vue') },
    { path: "/login", component: () => import('../components/auth/LoginUser.vue') },
    {
        path: "/chat",
        component: ()=> import('../components/ChatApp.vue'),
        meta: { requiresAuth: true },
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import('../components/_404.vue') 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {

    const authStore = useauthStore();

    // Ensure auth state is checked before navigating
    if (authStore.isAuthenticated === false && to.meta.requiresAuth) {
        await authStore.verifyAuth(); // Verify auth status
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
    } else {
        next(); // Proceed to route
    }

});
export default router;