<template>
  <UCard variant="subtle" class="max-w-md w-full mx-auto shadow-md">
    <div class="flex flex-col gap-6 p-4">
      <div class="flex justify-between">
        <span class="font-semibold text-lg">{{
          $t('app.dashboard-card.incomes')
        }}</span>
        <span class="font-mono text-lg">${{ totalIncome }}</span>
      </div>
      <div class="flex justify-between">
        <span class="font-semibold text-lg">{{
          $t('app.dashboard-card.expenses')
        }}</span>
        <span class="font-mono text-lg">${{ totalExpenses }}</span>
      </div>
      <div
        class="mt-4 text-center font-semibold text-xl"
        :class="{
          'text-green-400': netSavings >= 0,
          'text-red-500': netSavings < 0,
        }"
      >
        {{ $t('app.dashboard-card.net-savings') }}: ${{ netSavings }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type Expense from '#shared/models/expense'
import type Income from '#shared/models/income'

const props = defineProps<{
  expenses: Expense[]
  income: Income[]
}>()

const totalIncome = computed<number>(() =>
  props.income.reduce((sum, i) => sum + i.amount, 0)
)
const totalExpenses = computed<number>(() =>
  props.expenses.reduce((sum, e) => sum + e.amount, 0)
)
const netSavings = computed<number>(
  () => totalIncome.value - totalExpenses.value
)
</script>
