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
      :label="$t('pages.panel.incomes.index.filters.title')"
      @submit="onApplyFilters"
    />
    <BaseTable
      :rows="incomes"
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
import type Income from '#shared/models/income'
import type { Filter } from '~/components/base/BaseFilters.vue'

const { t } = useI18n()
const { $dialog } = useNuxtApp()
const { addLabel, addRoute, headTitle, onEdit, params, title } = useCRUDL()
const { incomes, loading, metadata } = storeToRefs(useIncomesStore())
const { deleteIncome, fetchAllIncomes } = useIncomesStore()

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

const columns: TableColumn<Income>[] = [
  {
    accessorKey: 'id',
    header: t('pages.panel.incomes.index.id'),
  },
  {
    accessorKey: 'name',
    header: t('pages.panel.incomes.index.name'),
  },
  {
    accessorKey: 'amount',
    header: t('pages.panel.incomes.index.amount'),
  },
  {
    accessorKey: 'description',
    header: t('pages.panel.incomes.index.description'),
  },
]

const filters: Filter[] = [
  {
    name: 'search',
    type: 'input',
    label: 'pages.panel.incomes.index.filters.search',
    placeholder: 'pages.panel.incomes.index.filters.search-placeholder',
    icon: 'i-heroicons-magnifying-glass',
  },
]

async function onApplyFilters(filters: any) {
  params.page = 1
  params.where = filters.search ? { search: filters.search } : null
  await fetchAllIncomes({ params })
}

async function onDelete(id: number) {
  const response = await $dialog.confirm({
    title: 'pages.panel.incomes.index.dialog.delete.title',
    message: 'pages.panel.incomes.index.dialog.delete.message',
  })
  if (response) {
    deleteIncome(id)
  }
}

async function onPageChange(page: number) {
  params.page = page
  await fetchAllIncomes({ params })
}

onMounted(async () => {
  await fetchAllIncomes()
})
</script>
