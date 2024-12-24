<template>
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
    <h2 class="text-2xl font-bold text-center mb-4">Register</h2>
    <form @submit.prevent="register">
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Name</label>
        <input v-model="form.name" type="text" class="w-full border-gray-300 rounded-lg p-2">
        </div>
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Email</label>
        <input v-model="form.email" type="email" class="w-full border-gray-300 rounded-lg p-2">
        </div>
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Password</label>
        <input v-model="form.password" type="password" class="w-full border-gray-300 rounded-lg p-2">
        </div>
        <div class="mb-4">
        <label class="block mb-1 text-gray-700">Avatar</label>
        <input type="file" @change="onFileChange"
            class="w-full border-gray-300 rounded-lg p-2">
            <p v-if="form.avatar">Selected file: {{ form.avatar.name }}</p>
        </div>
        <button class="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
    </form>
    </div>
</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {useauthStore} from '../../stores/authStore';
export default {
    setup(){

        const authStore = useauthStore();
        const router = useRouter();
        const form = ref({name: "", email: "", password: "", avatar: null})

        const onFileChange = (event) => {
            const file = event.target.files[0]; // Get the selected file
                if (file) {
                    form.value.avatar = file; // Update the form object
                }
            };


        const  register = async () =>{
            let data = {
                name : form.value.name,
                email : form.value.email,
                password : form.value.password,
                avatar : form.value.avatar,
            }

            authStore.register(data);
            router.push('/login')
        } 


        return{
            form , register , onFileChange
        }
    }
};
</script>
