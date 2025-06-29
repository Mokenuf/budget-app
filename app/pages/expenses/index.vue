<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <UButton icon="i-heroicons-plus" :label="addLabel" :to="addRoute" />
    </div>
    <BaseFilters
      :filters
      :label="$t('pages.expenses.index.filters.title')"
      @submit="onApplyFilters"
    />
    <BaseTable
      :rows="expenses"
      :metadata
      :columns
      :actions
      :loading
      @edit="onEdit"
      @delete="onDelete"
      @page-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Action } from '~/components/base/BaseTable.vue'
import type { TableColumn } from '@nuxt/ui'
import type { Filter } from '~/components/base/BaseFilters.vue'
import type Expense from '#shared/models/expense'
import type QueryParams from '#shared/models/query-params'

const { t } = useI18n()
const { $dialog } = useNuxtApp()
const { title, addLabel, addRoute, headTitle, onEdit } = useCRUDL()
const { expenses, loading, metadata } = storeToRefs(useExpensesStore())
const { deleteExpense, fetchAllExpenses } = useExpensesStore()

useHead({ title: headTitle })

const actions: Action[] = [
  {
    key: 'edit',
    icon: 'i-heroicons-pencil',
  },
  {
    key: 'delete',
    icon: 'i-heroicons-trash',
  },
]

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

const filters: Filter[] = [
  {
    name: 'search',
    type: 'input',
    label: 'pages.expenses.index.filters.search',
    placeholder: 'pages.expenses.index.filters.search-placeholder',
    icon: 'i-heroicons-magnifying-glass',
  },
]

function onApplyFilters(filters) {
  console.log(filters)
}

async function onDelete(id: number) {
  const response = await $dialog.confirm({
    title: 'pages.expenses.index.dialog.delete.title',
    message: 'pages.expenses.index.dialog.delete.message',
  })
  if (response) {
    deleteExpense(id)
  }
}

async function onPageChange(page: number) {
  const params: QueryParams = {
    page,
  }
  await fetchAllExpenses({ params })
}

onMounted(async () => {
  await fetchAllExpenses()
})
</script>
