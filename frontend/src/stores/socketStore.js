import { defineStore } from "pinia";

import socket from '../socket';


export const useSocketStore = defineStore('socket',{


    state :()=> ({

        message : [],
    }),
    actions : {

        connectSocket(){
            socket.on('connect', () => {
                console.log('Connected to Socket.IO server:', socket.id);
            });
        } ,
        deconnectedSocket(){
            socket.off('connect');
        } ,
        sendMessage(room, message){
            socket.emit('sendMessage', { room, message });
        },
        reciveMessgae(){
            socket.on('receiveMessage', (message) => {
                console.log('New message received:', message);
            });
        }

    }

});

