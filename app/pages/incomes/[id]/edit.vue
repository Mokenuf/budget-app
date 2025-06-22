<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.incomes.edit.title', { id: $route.params.id ?? 'N/A' }) }}
    </h2>
    <FormIncome :income="income" @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
import type Income from '#shared/models/income'
import { MOCK_INCOMES } from '../../../../mock-data'

const route = useRoute()

const income = computed<Income | undefined>(() => {
  return MOCK_INCOMES.find((e) => e.id === Number(route.params.id))
})

function onSubmit(data) {
  console.log(data)
}
</script>
