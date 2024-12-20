<template>
    <aside class="bg-gray-50 shadow-xl w-64 p-4 border-r h-screen">
      <h2 class="text-lg font-semibold mb-4">Chats App</h2>
    
      <card-user class="my-2 cursor-pointer" 
      v-for="user in users" 
      :key=user.id 
      :user=user 
      @click="selectUser(user)">

      </card-user>


  </aside>
</template>

<script>
import { useChatStore } from '../stores/chatStore';
import CardUser from '../ui/CardUser.vue';
export default {
    components : {
      CardUser
    },
    setup () {

        const ChatStore = useChatStore();
        
        //must the name of variable match the same proprty 
        const {users} = ChatStore ;


        const selectUser= (user)=>{
          ChatStore.setActiveUser(user);
        }
        return { users , selectUser}
    }
}
</script>

<style scoped>

</style>