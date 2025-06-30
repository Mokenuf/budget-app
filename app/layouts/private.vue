<template>
  <div class="min-h-screen">
    <AppHeader @open-sidebar="isSidebarOpen = !isSidebarOpen" />
    <div class="flex">
      <AppSidebar
        :is-open="isSidebarOpen"
        class="transition-all duration-300"
      />

      <main
        class="transition-all duration-300 ease-in-out w-full mt-4 px-10"
        :class="{ 'ml-64': isSidebarOpen }"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(true)
</script>
