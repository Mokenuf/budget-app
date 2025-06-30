<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">
      {{ $t('pages.auth.sign-in.title') }}
    </h2>
    <FormAuthSignIn @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

function onSubmit(data) {
  console.log(data)
  navigateTo(localePath('panel-dashboard')) // TODO: Implement sign in
}
</script>
