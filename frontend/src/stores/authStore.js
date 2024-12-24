import { defineStore } from "pinia";
import axios from 'axios';


export const useauthStore = defineStore('auth' , {
    //state :
    state : () => ({
        isAuthenticated : false,
        user : null 
    }),
    
    //action:
    actions : {

        async register(data){
            try {
                await axios.post('/register' , data ,  {
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    },
                    withCredentials : true,
                } )
                
            } catch (error) {
                console.log(error);
            }
        },
        async login(data){
            try {
                await axios.post('/login' , data ,  {
                    headers : {"Content-Type" : "application/json"},
                    withCredentials : true});

                // // Verify after login      
                await this.verifyAuth();   
            } catch (error) {
                console.error('Login failed', error);
            }

        },
        async logout(){
            try {
                await axios.post('/logout' , {} , { withCredentials: true });
                this.isAuthenticated = false ;
            } catch (error) {
                console.error('Logout failed', error);
                
            }
            
        },
        async verifyAuth(){
            try {
                
                let response = await axios.get('/me',{ withCredentials: true });
                if(response){
                    this.isAuthenticated = true ;
                    this.user = response.data.user ;
                }
            } catch (error) {
                this.isAuthenticated = false ;
                this.user = null ;
            }
        }
    }
}) 