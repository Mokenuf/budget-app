<template>
  <div>
    <UTable
      :data="rows"
      :columns="columnsWithActions"
      :empty="$t('app.base.table.empty')"
      :ui="{
        td: 'px-4 py-3 text-sm text-gray-300',
        th: 'px-4 py-3 text-sm text-left text-gray-400 uppercase',
        base: 'rounded-md, border border-gray-700 overflow-hidden',
      }"
      :loading
    >
      <template #actions-cell="{ row: { original } }">
        <div class="flex justify-end gap-2">
          <UButton
            v-for="action in actions"
            :key="action.key"
            :icon="action.icon"
            variant="ghost"
            size="xs"
            @click="emits(action.key, original.id)"
          />
        </div>
      </template>
    </UTable>
    <UPagination
      v-if="metadata"
      v-model:page="currentPage"
      class="mt-4"
      :items-per-page="metadata.pageSize"
      :total="metadata.total"
      :ui="{
        first: 'cursor-pointer',
        last: 'cursor-pointer',
        next: 'cursor-pointer',
        prev: 'cursor-pointer',
        item: 'cursor-pointer',
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type Metadata from '#shared/models/metadata'

type ActionKey = 'edit' | 'delete' | 'view'

export interface Action {
  key: ActionKey
  icon: string
}

const props = defineProps<{
  actions?: Action[]
  columns: TableColumn<any>[]
  loading?: boolean
  metadata?: Metadata
  rows: any[]
}>()

const emits = defineEmits<{
  (e: Action['key'] | 'page-change', value: number): void
}>()

const currentPage = ref(props.metadata?.page || 1)

const columnsWithActions = computed<TableColumn<any>[]>(() => {
  if (!props.actions?.length) return props.columns
  return [
    ...props.columns,
    {
      id: 'actions',
    },
  ]
})

watch(currentPage, (page) => {
  emits('page-change', page)
})
</script>
