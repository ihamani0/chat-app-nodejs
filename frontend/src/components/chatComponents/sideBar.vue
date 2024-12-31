<template>
    <aside class="bg-gray-50 shadow-xl w-64 p-4 border-r h-screen">
      <h2 class="text-lg font-semibold mb-4">Chats App</h2>
    
      <card-user class="my-2 cursor-pointer" 
      v-for="user in users" 
      :key=user.id 
      :user=user 
      @click="selectUser(user)">

      </card-user>

      <button class="p-2 bg-red-500 text-white rounded-md w-full mt-4" @click="logout">
        logout
      </button> 

  </aside>
</template>

<script>
import { useChatStore } from '../../stores/chatStore';
import { useauthStore } from '../../stores/authStore';
import CardUser from '../../ui/CardUser.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
export default {
    components : {
      CardUser
    },
    setup () {

        const ChatStore = useChatStore();
        const authStore = useauthStore();
        const router = useRouter();
        
        //must the name of variable match the same proprty 
        const  users  = ref(ChatStore.users) ;

        //watch if ther change in list of user update components
        watch(
          ()=> ChatStore.users,
          (newValue)=>{
            users.value = newValue;
          }
        )
        //fetch all users 
        onMounted(()=>{
          ChatStore.fetchUsers();
        })

        const selectUser= (user)=>{
          ChatStore.setActiveUser(user);
        }
        const logout = ()=>{
          authStore.logout();
          router.push('/login');
        }
        return { users , selectUser ,logout};
    }
}
</script>

<style scoped>

</style>