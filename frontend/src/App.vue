<script >

import sideBarVue from "./components/sideBar.vue";
import inputMessage from "./components/inputMessage.vue";
import AppHeader from "./components/AppHeader.vue";
import chatWindow from "./components/ChatWindow.vue";

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
