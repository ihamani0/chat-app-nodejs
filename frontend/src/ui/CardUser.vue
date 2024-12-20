<template>
    <div class="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 ">
        <!-- Avatar -->
        <div class="relative">
            <img
                :src="user.avatar"
                alt="User Avatar"
                class="w-12 h-12 rounded-full border-2 border-gray-200"
            />
        <!-- Online/Offline Status Indicator -->
            <span
                :class="
                user.isOnlin ? 'bg-green-500' : 'bg-gray-400'
                "
                class="absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white"
            ></span>
        </div>

        <!-- User Info -->
        <div class="flex-1">
        <div class="flex items-center justify-between">
            <!-- Name -->
            <h3 class="text-lg font-semibold text-gray-800">
            {{ user.name }}
            </h3>
            <!-- Online/Offline Text -->
            <span
            :class="user.isOnline ? 'text-green-500' : 'text-gray-400'" 
            class="text-sm font-medium"
            >
            {{ user.isOnline ? 'Online' : 'Offline' }}
            </span>
        </div>
        <!-- Last Message -->
        <p class="text-sm text-gray-500 truncate">
            {{ user.lastMessage }}
        </p>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        user : {
            type : Object ,
            required: true,
        }
    }
}

</script>

<style scoped>

</style>