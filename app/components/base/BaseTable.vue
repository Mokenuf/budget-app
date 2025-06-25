<template>
  <UTable
    :data="rows"
    :columns="columnsWithActions"
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
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

type ActionKey = 'edit' | 'delete' | 'view'

export type Action = {
  key: ActionKey
  icon: string
}

const props = defineProps<{
  rows: any[]
  columns: TableColumn<any>[]
  actions?: Action[]
  loading?: boolean
}>()

const emits = defineEmits<{
  (e: Action['key'], id: number): void
}>()

const columnsWithActions = computed<TableColumn<any>[]>(() => {
  if (!props.actions?.length) return props.columns
  return [
    ...props.columns,
    {
      id: 'actions',
    },
  ]
})
</script>
