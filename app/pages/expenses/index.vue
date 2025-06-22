<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ $t('pages.expenses.index.title') }}
      </h2>
      <UButton
        icon="i-heroicons-plus"
        :label="$t('pages.expenses.index.add')"
        :to="$localePath('expenses-add')"
      />
    </div>
    <BaseTable
      :rows="MOCK_EXPENSES"
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
import type Expense from '#shared/models/expense'
import { MOCK_EXPENSES } from '../../../mock-data'
const localePath = useLocalePath()
const { t } = useI18n()

const actions: ActionKey[] = ['edit', 'delete']

const columns: TableColumn<Expense>[] = [
  {
    accessorKey: 'id',
    header: t('pages.expenses.index.id'),
  },
  {
    accessorKey: 'name',
    header: t('pages.expenses.index.name'),
  },
  {
    accessorKey: 'amount',
    header: t('pages.expenses.index.amount'),
  },
  {
    accessorKey: 'description',
    header: t('pages.expenses.index.description'),
  },
]

function onEdit(id: string) {
  navigateTo(localePath({ name: 'expenses-id-edit', params: { id } }))
}

function onDelete(id: string) {
  console.log('delete', id)
}
</script>
