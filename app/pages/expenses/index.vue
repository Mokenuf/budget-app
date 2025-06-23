<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <UButton icon="i-heroicons-plus" :label="addLabel" :to="addRoute" />
    </div>
    <BaseTable
      :rows="expenses"
      :columns
      :actions
      :loading
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { ActionKey } from '~/components/base/BaseTable.vue'
import type { TableColumn } from '@nuxt/ui'
import type Expense from '#shared/models/expense'

const { t } = useI18n()
const { title, addLabel, addRoute, headTitle, onEdit, onDelete } = useCRUDL()
const { expenses, loading } = storeToRefs(useExpensesStore())
const { fetchAllExpenses } = useExpensesStore()

useHead({ title: headTitle })

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

onMounted(async () => {
  await fetchAllExpenses()
})
</script>
