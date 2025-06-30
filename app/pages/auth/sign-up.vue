<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">
      {{ $t('pages.auth.sign-up.title') }}
    </h2>
    <FormAuthSignUp @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

function onSubmit(data) {
  console.log(data)
  navigateTo(localePath('panel-dashboard')) // TODO: Implement sign up
}
</script>
