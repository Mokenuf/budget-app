<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.expenses.edit.title', { id: $route.params.id ?? 'N/A' }) }}
    </h2>
    <FormExpense :expense="expense" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type Expense from '#shared/models/expense'
import { MOCK_EXPENSES } from '../../../../mock-data'

const route = useRoute()

const expense = computed<Expense | undefined>(() => {
  return MOCK_EXPENSES.find((e) => e.id === Number(route.params.id))
})

function onSubmit(data) {
  console.log(data)
}
</script>
