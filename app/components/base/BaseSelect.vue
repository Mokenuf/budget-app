<template>
  <USelect v-model="model" :items="translatedItems" :placeholder :required />
</template>

<script setup lang="ts">
export interface OptionItem {
  label: string
  value: any
}
const { t } = useI18n()

const props = defineProps<{
  modelValue: any
  options: OptionItem[]
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const model = computed<any>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const translatedItems = computed<OptionItem[]>(() => {
  return props.options.map((o) => ({
    label: t(o.label),
    value: o.value,
  }))
})
</script>
