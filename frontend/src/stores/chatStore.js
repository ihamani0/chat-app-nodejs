import axios from "axios";
import { defineStore } from "pinia";
import { useauthStore } from "./authStore";
import {useSocketStore} from './socketStore'

export const useChatStore = defineStore('chat' , {
    //state :
    state : () => ({
        users : [] ,
        ActiveUser: null , // User currently being chatted with
        message : [], // Array to hold chat messages
        
    }),
    //getters : 
    getters : {
        getActiveUser : (state) => state.ActiveUser , // return object
        
        getAllMessage : (state) => state.message , //return Array
        
        isEmptyActiveUser: (state) => state.ActiveUser == null// return boolen
    } ,
    //action:
    actions : {
        setActiveUser(target_user){
                //1- call the current user from authStore
                const authStore = useauthStore();
                const current_user = authStore.user;
                //2-generate the iunique room and joining room
                const socketStore = useSocketStore();
                socketStore.generatUniqueRoom(current_user , target_user);

                //set active user 
                this.ActiveUser = target_user ;
        },
        saveMessage(msg){
            //emit send message using socket 
            const socketStore = useSocketStore();

            
            socketStore.sendMessage(socketStore.room,msg);
            
            this.message.push(msg);
        } ,
        reciveMessgae(message){
            

            const authStore = useauthStore();
            //console.log(authStore.user.userId === message.senderId);

            //verif y if the message is from server 
            if(authStore.user.userId === message.senderId ) return;

            console.log(message)
            //add the message to the message array
            this.message.push(message);
        },
        async fetchUsers(){
            try {
                const response = await axios.get("/get-users" ,{
                    withCredentials: true // Include cookies in the request
                });
                this.users = response.data
            } catch (error) { 
                console.log(error)
            }
        }

    }
}) 