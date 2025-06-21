<template>
  <UContainer>
    <span class="text-2xl font-bold"
      >{{ appConfig.title }} | {{ $t('index.title') }}</span
    >
  </UContainer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>
