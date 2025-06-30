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
      :label="$t('pages.panel.expenses.index.filters.title')"
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

const { t } = useI18n()
const { $dialog } = useNuxtApp()
const { addLabel, addRoute, headTitle, onEdit, params, title } = useCRUDL()
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
    header: t('pages.panel.expenses.index.id'),
  },
  {
    accessorKey: 'name',
    header: t('pages.panel.expenses.index.name'),
  },
  {
    accessorKey: 'amount',
    header: t('pages.panel.expenses.index.amount'),
  },
  {
    accessorKey: 'description',
    header: t('pages.panel.expenses.index.description'),
  },
]

const filters: Filter[] = [
  {
    name: 'search',
    type: 'input',
    label: 'pages.panel.expenses.index.filters.search',
    placeholder: 'pages.panel.expenses.index.filters.search-placeholder',
    icon: 'i-heroicons-magnifying-glass',
  },
]

async function onApplyFilters(filters: any) {
  params.page = 1
  params.where = {
    ...(filters.search ? { search: filters.search } : {}),
  }
  await fetchAllExpenses({ params })
}

async function onDelete(id: number) {
  const response = await $dialog.confirm({
    title: 'pages.panel.expenses.index.dialog.delete.title',
    message: 'pages.panel.expenses.index.dialog.delete.message',
  })
  if (response) {
    deleteExpense(id)
  }
}

async function onPageChange(page: number) {
  params.page = page
  await fetchAllExpenses({ params })
}

onMounted(async () => {
  await fetchAllExpenses({ params })
})
</script>
