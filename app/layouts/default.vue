<template>
  <div class="min-h-screen">
    <AppHeader @open-sidebar="isSidebarOpen = !isSidebarOpen" />
    <div class="flex">
      <AppSidebar
        :is-open="isSidebarOpen"
        class="transition-all duration-300"
      />

      <main
        class="transition-all duration-300 ease-in-out h-full mt-4"
        :class="{ 'ml-64': isSidebarOpen }"
      >
        <UContainer>
          <slot />
        </UContainer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isSidebarOpen = ref(true)
</script>
