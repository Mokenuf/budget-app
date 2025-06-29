<template>
  <USelectMenu
    v-model="model"
    :loading
    :items="translatedItems"
    :multiple
    :placeholder
    :required
    :search-input
    :ui="{
      trailingIcon:
        'group-data-[state=open]:rotate-180 transition-transform duration-200',
    }"
  />
</template>

<script setup lang="ts">
export interface OptionItem {
  label: string
  value: any
}

const { t } = useI18n()

const props = defineProps<{
  loading?: boolean
  modelValue: any
  multiple?: boolean
  options: OptionItem[]
  placeholder?: string
  required?: boolean
  searchable?: boolean
  searchPlaceholder?: string
  searchIcon?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

/* Computed that controls the input/output of the v-model
 ** We pass (get) from the computed selectedOption to the v-model via the value prop
 ** We emit (set) from the v-model only the "value" property of the selected item
 */
const model = computed<any>({
  get: () => selectedOption.value,
  set: (selected: OptionItem | OptionItem[] | null) => {
    if (Array.isArray(selected)) {
      emit(
        'update:modelValue',
        selected.map((s) => s.value)
      )
    } else {
      emit('update:modelValue', selected?.value ?? null)
    }
  },
})

/* Computed that returns the search input configuration if searchable is true */
const searchInput = computed(() => {
  if (!props.searchable) return false
  return {
    placeholder:
      props.searchPlaceholder || t('app.base.select.search-placeholder'),
    icon: props.searchIcon || 'i-heroicons-magnifying-glass',
  }
})

/* Computed that transforms the external model value (strings or array of strings) into the format expected by USelectMenu
 ** This is needed because USelectMenu expects an array of objects with value and label properties
 ** we use the translatedItems computed to get the correct label for the value
 */
const selectedOption = computed(() => {
  if (props.multiple) {
    return translatedItems.value.filter((ti) =>
      props.modelValue?.includes(ti.value)
    )
  } else {
    return (
      translatedItems.value.find((ti) => ti.value === props.modelValue) || null
    )
  }
})

/* Computed used to translate items, retains original values */
const translatedItems = computed<OptionItem[]>(() => {
  return props.options.map((o) => ({
    label: t(o.label),
    value: o.value,
  }))
})
</script>
