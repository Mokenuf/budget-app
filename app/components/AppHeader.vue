<template>
  <header class="flex items-center h-12 bg-(--ui-bg-muted)">
    <h2 class="text-2xl font-bold pl-2">{{ appConfig.title }}</h2>
    <UButton
      class="cursor-pointer"
      icon="i-heroicons-bars-3"
      variant="ghost"
      @click="handleOpenSidebar"
    />
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['open-sidebar'])
const appConfig = useAppConfig()

function handleOpenSidebar() {
  emit('open-sidebar')
}
</script>
