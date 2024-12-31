import { defineStore } from "pinia";

import socket from '../socket';
import { useChatStore } from "./chatStore";


export const useSocketStore = defineStore('socket',{


    state :()=> ({
        room : null,
    }),
    actions : {

        connectSocket(){
            socket.on('connect', () => {
                console.log('Connected to Socket.IO server:', socket.id);
            });
        } ,
        joinRoom(room){
            socket.emit('joinRoom', room);
            this.room = room;
        },
        deconnectedSocket(){
            socket.off('connect');
        } ,
        sendMessage(room, message){
            socket.emit('sendMessage', { room, message });
        },
        reciveMessgae(){
            socket.on('receiveMessage', (message) => {
                const ChatStore = useChatStore();
                ChatStore.reciveMessgae(message);
            });
        },
        
        generatUniqueRoom(current_user,target_user){
            const sortedIds = [current_user.userId, target_user._id].sort();
            this.room = sortedIds.join("-");

            //joining room
            this.joinRoom(this.room);
        }

    }

});

