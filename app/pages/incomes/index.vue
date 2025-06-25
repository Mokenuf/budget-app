<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <UButton icon="i-heroicons-plus" :label="addLabel" :to="addRoute" />
    </div>
    <BaseTable
      :rows="incomes"
      :columns
      :actions
      :loading
      @edit="onEdit"
      @delete="onDelete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Action } from '~/components/base/BaseTable.vue'
import type { TableColumn } from '@nuxt/ui'
import type Income from '#shared/models/income'

const { t } = useI18n()
const { $dialog } = useNuxtApp()
const { title, addLabel, addRoute, headTitle, onEdit } = useCRUDL()
const { incomes, loading } = storeToRefs(useIncomesStore())
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

async function onDelete(id: number) {
  const response = await $dialog.confirm({
    title: 'pages.incomes.index.dialog.delete.title',
    message: 'pages.incomes.index.dialog.delete.message',
  })
  if (response) {
    deleteIncome(id)
  }
}

onMounted(async () => {
  await fetchAllIncomes()
})
</script>
