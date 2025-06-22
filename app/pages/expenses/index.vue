<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">{{ $t('expenses.index.title') }}</h2>
    <BaseTable :rows="MOCK_EXPENSES" :columns />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type Expense from '#shared/models/expense'
import { MOCK_EXPENSES } from '../../../mock-data'
const { t } = useI18n()

const columns: TableColumn<Expense>[] = [
  {
    accessorKey: 'id',
    header: t('expenses.index.id'),
  },
  {
    accessorKey: 'name',
    header: t('expenses.index.name'),
  },
  {
    accessorKey: 'amount',
    header: t('expenses.index.amount'),
  },
  {
    accessorKey: 'description',
    header: t('expenses.index.description'),
  },
]
</script>
