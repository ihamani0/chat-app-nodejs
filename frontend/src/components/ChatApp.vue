<script >

import sideBarVue from "./chatComponents/sideBar.vue";
import inputMessage from "./chatComponents/inputMessage.vue";
import AppHeader from "./chatComponents/AppHeader.vue";
import chatWindow from "./chatComponents/ChatWindow.vue";

export default {
    components : {
        sideBarVue , inputMessage , AppHeader , chatWindow
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
