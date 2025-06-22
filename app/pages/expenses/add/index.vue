<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.expenses.add.title') }}
    </h2>
    <FormExpense @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
function onSubmit(data) {
  console.log(data)
}
</script>
