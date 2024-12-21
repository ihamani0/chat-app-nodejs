import { defineStore } from "pinia";



export const useauthStore = defineStore('auth' , {
    //state :
    state : () => ({
        isAuthenticated : false
    }),
    
    //action:
    actions : {
        login(){
                this.isAuthenticated = true ;
        },
        logout(){
            this.isAuthenticated = false ;
        }
    }
}) 