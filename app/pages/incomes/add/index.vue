<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.incomes.add.title') }}
    </h2>
    <FormIncome @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
function onSubmit(data) {
  console.log(data)
}
</script>
