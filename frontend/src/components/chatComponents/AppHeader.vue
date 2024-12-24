<template>
    <header class="bg-slate-600 text-white shadow-md flex justify-between items-center p-4">
        
        <div class="flex items-center space-x-4">
        <!-- Avatar -->
        <img
            v-if="activeUserReactive"
            :src="activeUserReactive.avatar"
            alt="User Avatar"
            class="w-10 h-10 rounded-full border-2 border-white"
        />
        <!-- User Name -->
        <h1
            class="text-lg font-semibold cursor-pointer hover:text-blue-200 transition-colors"
        >
            {{ activeUserReactive ? activeUserReactive.name : 'Select a User' }}
        </h1>
        </div>

        <!-- Right Section: App Title -->
        <div>
            <img
                :src="user.avatar"
                alt="User Avatar"
                class="w-12 h-12 rounded-full border-2 border-gray-200"
            />
        </div>
    </header>
</template>

<script>
import {  ref, watch } from 'vue';
import { useChatStore } from '../../stores/chatStore'
import { useauthStore } from '../../stores/authStore'
export default {
    setup () {
        const ChatStore = useChatStore();
        const authStore = useauthStore();

        let activeUserReactive = ref(ChatStore.ActiveUser);

        watch(
            () => ChatStore.ActiveUser ,
            (newActiveUser)=>{
                activeUserReactive.value = newActiveUser;
            }
        )
        return {activeUserReactive , user: authStore.user}
    }
}
</script>

<style  scoped>

</style>