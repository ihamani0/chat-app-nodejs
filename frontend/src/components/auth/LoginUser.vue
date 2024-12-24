<template>
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
    <h2 class="text-2xl font-bold text-center mb-4">Login</h2>
    <form @submit.prevent="login">
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Email</label>
        <input v-model="form.email" type="email" class="w-full border-gray-300 rounded-lg p-2">
        </div>
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Password</label>
        <input v-model="form.password" type="password" class="w-full border-gray-300 rounded-lg p-2">
        </div>
        <button class="w-full bg-blue-500 text-white py-2 rounded-lg">Login</button>
    </form>
    </div>
</div>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useauthStore } from '../../stores/authStore';
export default {
setup(){

    const authStore = useauthStore();
    const router = useRouter();
    const form = ref({email: "", password: ""})

    const login = async ()=>{

            let data = {
                email : form.value.email,
                password : form.value.password,
            }

            authStore.login(data);

            router.push('/chat');
            }
    return{
        form ,login
    }
    }
};
</script>
