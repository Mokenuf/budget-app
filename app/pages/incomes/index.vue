<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">
        {{ $t('pages.incomes.index.title') }}
      </h2>
      <UButton
        icon="i-heroicons-plus"
        :label="$t('pages.incomes.index.add')"
        :to="$localePath('incomes-add')"
      />
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

const localePath = useLocalePath()
const { t } = useI18n()

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

function onEdit(id: string) {
  navigateTo(localePath({ name: 'incomes-id-edit', params: { id } }))
}

function onDelete(id: string) {
  console.log('delete', id)
}
</script>
