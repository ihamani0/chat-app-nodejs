<template>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
    <h1 class="text-6xl font-bold mb-4">404</h1>
    <p class="text-lg mb-6">Oops! The page you’re looking for doesn’t exist.</p>
    <router-link 
    to="/" 
    class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
    >
    Go Back Home
    </router-link>
</div>
</template>

<script>
export default {
name: "NotFoundPage",
};
</script>
  