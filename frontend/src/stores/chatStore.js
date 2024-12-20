import { defineStore } from "pinia";


export const useChatStore = defineStore('chat' , {
    //state :
    state : () => ({
        users : [
            {id:1, name:'Hamani' , isOnlin:true , avatar : "https://via.placeholder.com/150" , lastMessage :'Hello'},
            {id:2, name:'issam' , isOnlin:false ,avatar : "https://via.placeholder.com/150" , lastMessage :'Hello'},
        ] ,
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
        setActiveUser(user){
                this.ActiveUser = user ;
        },
        saveMessage(msg){
            this.message.push(msg);
            
        }
    }
}) 