<template>
  <UTable
    :data="rows"
    :columns="columnsWithActions"
    :ui="{
      td: 'px-4 py-3 text-sm text-gray-300',
      th: 'px-4 py-3 text-sm text-left text-gray-400 uppercase',
      base: 'rounded-md, border border-gray-700 overflow-hidden',
    }"
  >
    <template #actions-cell="{ row: { original } }">
      <div class="flex justify-end gap-2">
        <UButton
          v-if="actions?.includes('view')"
          icon="i-heroicons-eye"
          variant="ghost"
          size="xs"
          @click="emits('view', original.id)"
        />
        <UButton
          v-if="actions?.includes('edit')"
          icon="i-heroicons-pencil"
          variant="ghost"
          size="xs"
          @click="emits('edit', original.id)"
        />
        <UButton
          v-if="actions?.includes('delete')"
          icon="i-heroicons-trash"
          variant="ghost"
          size="xs"
          @click="emits('delete', original.id)"
        />
      </div>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

export type ActionKey = 'edit' | 'delete' | 'view'

const props = defineProps<{
  rows: any[]
  columns: TableColumn<any>[]
  actions?: ActionKey[]
}>()

const emits = defineEmits<{
  (e: 'edit' | 'delete' | 'view', id: string): void
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
