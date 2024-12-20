<template>
    <div class="chat-body flex-1 p-4 bg-gray-50 rounded-lg shadow-inner overflow-y-auto">
        <!-- No Active User Message -->
        <div v-if="!activeUserReactive" class="text-center text-gray-500 h-full flex items-center justify-center">
            <p class="text-lg">Select a user to start chatting</p>
        </div>

        <!-- Chat Area -->
        <div v-else class="h-full flex flex-col">
            <!-- User Name -->
            <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">{{ activeUserReactive.name }}</h2>

            <!-- Messages Container -->
            <div class="flex-1 flex flex-col space-y-2 overflow-y-auto">
                <!-- Messages -->
                <div v-for="(message, index) in userMessages" :key="index" :class="[
                    'message p-3 rounded-lg max-w-xs',
                    message.isMine ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start',
                ]">
                    <p>{{ message.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useChatStore } from "../stores/chatStore"
export default {
    setup() {

        const chatStore = useChatStore();

        let activeUserReactive = ref(chatStore.ActiveUser);

        watch(
            () => chatStore.ActiveUser,
            (newActiveUser) => {
                activeUserReactive.value = newActiveUser;
            }
        )


        let userMessages = computed(() => {
            if (!activeUserReactive.value) return []; // If no active user, return an empty array
            return chatStore.message.filter((msg) => msg.userId === activeUserReactive.value.id);
        });

        return {
            userMessages, activeUserReactive
        }
    }
}
</script>

<style scoped></style>