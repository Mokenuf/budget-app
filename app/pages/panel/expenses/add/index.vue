<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.panel.expenses.add.title') }}
    </h2>
    <FormExpense :loading @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const { loading } = storeToRefs(useExpensesStore())
const { createExpense } = useExpensesStore()

function onSubmit(data) {
  createExpense(data)
}
</script>
