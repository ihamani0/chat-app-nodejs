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

        <span v-if="activeUserReactive"
            :class="activeUserReactive.isOnlin ? 'bg-green-500' : 'bg-gray-400'"
            class="bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white"
        ></span>
        </div>
    </header>
</template>

<script>
import {  ref, watch } from 'vue';
import { useChatStore } from '../stores/chatStore'
export default {
    setup () {
        const ChatStore = useChatStore();

        let activeUserReactive = ref(ChatStore.ActiveUser);

        watch(
            () => ChatStore.ActiveUser ,
            (newActiveUser)=>{
                activeUserReactive.value = newActiveUser;
            }
        )
        return {activeUserReactive}
    }
}
</script>

<style  scoped>

</style>