<template>
  <UCard variant="subtle" class="max-w-md w-full mx-auto shadow-md">
    <div class="flex flex-col gap-6 p-4">
      <USkeleton v-if="loading" class="w-full h-10" />
      <USkeleton v-if="loading" class="w-full h-10" />
      <template v-else>
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
      </template>
      <USkeleton v-if="loading" class="w-full h-10" />
      <template v-else>
        <div
          class="mt-4 text-center font-semibold text-xl"
          :class="{
            'text-green-400': netSavings >= 0,
            'text-red-500': netSavings < 0,
          }"
        >
          <span class="font-mono text-lg">
            {{ $t('app.dashboard-card.net-savings') }}: ${{ netSavings }}
          </span>
        </div>
      </template>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import type Expense from '#shared/models/expense'
import type Income from '#shared/models/income'

const props = defineProps<{
  expenses: Expense[]
  incomes: Income[]
  loading: boolean
}>()

const totalIncome = computed<number>(() =>
  props.incomes.reduce((sum, i) => sum + i.amount, 0)
)
const totalExpenses = computed<number>(() =>
  props.expenses.reduce((sum, e) => sum + e.amount, 0)
)
const netSavings = computed<number>(
  () => totalIncome.value - totalExpenses.value
)
</script>
