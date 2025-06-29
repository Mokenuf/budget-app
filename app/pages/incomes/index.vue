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
      :label="$t('pages.incomes.index.filters.title')"
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
import type QueryParams from '#shared/models/query-params'
import type { Filter } from '~/components/base/BaseFilters.vue'

const { t } = useI18n()
const { $dialog } = useNuxtApp()
const { title, addLabel, addRoute, headTitle, onEdit } = useCRUDL()
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

const filters: Filter[] = [
  {
    name: 'search',
    type: 'input',
    label: 'pages.incomes.index.filters.search',
    placeholder: 'pages.incomes.index.filters.search-placeholder',
    icon: 'i-heroicons-magnifying-glass',
  },
]

function onApplyFilters(filters: any) {
  console.log(filters)
}

async function onDelete(id: number) {
  const response = await $dialog.confirm({
    title: 'pages.incomes.index.dialog.delete.title',
    message: 'pages.incomes.index.dialog.delete.message',
  })
  if (response) {
    deleteIncome(id)
  }
}

async function onPageChange(page: number) {
  const params: QueryParams = {
    page,
  }
  await fetchAllIncomes({ params })
}

onMounted(async () => {
  await fetchAllIncomes()
})
</script>
