<script >

import sideBarVue from "./chatComponents/sideBar.vue";
import inputMessage from "./chatComponents/inputMessage.vue";
import AppHeader from "./chatComponents/AppHeader.vue";
import chatWindow from "./chatComponents/ChatWindow.vue";


import { onMounted, onUnmounted } from "vue";
import { useSocketStore } from '../stores/socketStore';

export default {
    components : {
        sideBarVue , inputMessage , AppHeader , chatWindow
    },

    setup(){
        const socketStore = useSocketStore()
        
        onMounted(() => {
            socketStore.connectSocket();
        }) 

        onUnmounted(() => {
            socketStore.deconnectedSocket();
        });
    }

}

</script>

<template>

    <div class="h-screen flex">
    <sideBarVue />

    <div class="flex-1 flex flex-col">
        <AppHeader/>
        <chatWindow/>
        <inputMessage/>
    </div>
    </div>

</template>

<style scoped>
    
</style>
