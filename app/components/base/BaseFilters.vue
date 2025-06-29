<template>
  <div v-if="filters">
    <UCard variant="subtle">
      <UForm :state="filterModel" @submit="onSubmit">
        <div v-for="filter in filters" :key="filter.name">
          <UFormField :label="$t(filter.label || '')">
            <UInput
              v-if="isType(filter.type, 'input')"
              v-model="filterModel[filter.name]"
              :icon="filter.icon"
              :placeholder="$t(filter.placeholder || '')"
            />
            <BaseDatePicker
              v-if="
                isType(filter.type, 'date') || isType(filter.type, 'date-range')
              "
              v-model="filterModel[filter.name]"
              :type="filter.type"
              :placeholder="$t(filter.placeholder || '')"
              :date-style="filter.dateStyle || 'short'"
            />
            <BaseSelect
              v-if="isType(filter.type, 'select')"
              v-model="filterModel[filter.name]"
              :options="filter.options || []"
              :placeholder="$t(filter.placeholder || '')"
            />
          </UFormField>
        </div>
        <div class="flex gap-2 justify-end">
          <UButton
            class="cursor-pointer"
            type="submit"
            :label="$t('app.base.filters.submit')"
          />
          <UButton
            class="cursor-pointer"
            type="button"
            variant="outline"
            :label="$t('app.base.filters.reset')"
            @click="onReset"
          />
        </div>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { OptionItem } from './BaseSelect.vue'

export interface Filter {
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  disabled?: boolean
  label?: string
  name: string
  icon?: string
  options?: OptionItem[]
  placeholder?: string
  type: 'input' | 'select' | 'select-search' | 'date' | 'date-range'
  value?: any
}

defineProps<{
  filters: Filter[]
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()

const filterModel = reactive<any>({})

function isType(itemType: Filter['type'], type: string): boolean {
  return itemType === type
}

function onSubmit({ data }: FormSubmitEvent<any>) {
  emit('submit', data)
}

function onReset() {
  for (const key in filterModel) {
    filterModel[key] = null
  }
  emit('submit', {})
}
</script>
