<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.incomes.index.title') }}
    </h2>
    <BaseTable :rows="MOCK_INCOMES" :columns />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type Income from '#shared/models/income'
import { MOCK_INCOMES } from '../../../mock-data'
const { t } = useI18n()

const columns: TableColumn<Income>[] = [
  {
    accessorKey: 'id',
    header: t('pages.incomes.index.id'),
  },
  {
    accessorKey: 'name',
    header: t('pages.incomes.index.name'),
  },
  {
    accessorKey: 'amount',
    header: t('pages.incomes.index.amount'),
  },
  {
    accessorKey: 'description',
    header: t('pages.incomes.index.description'),
  },
]
</script>
