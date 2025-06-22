<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <UButton icon="i-heroicons-plus" :label="addLabel" :to="addRoute" />
    </div>
    <BaseTable
      :rows="MOCK_INCOMES"
      :columns
      :actions
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { ActionKey } from '~/components/base/BaseTable.vue'
import type { TableColumn } from '@nuxt/ui'
import type Income from '#shared/models/income'
import { MOCK_INCOMES } from '../../../mock-data'

const { t } = useI18n()
const { title, addLabel, addRoute, onEdit, onDelete } = useCRUDL()

const actions: ActionKey[] = ['edit', 'delete']

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
