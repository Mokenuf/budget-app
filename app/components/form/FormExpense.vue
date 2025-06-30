<template>
  <UForm class="space-y-4" :state="formModel" :schema @submit="onSubmit">
    <UFormField
      :label="$t('app.form.expense.fields.name')"
      name="name"
      size="xl"
      required
    >
      <UInput
        v-model="formModel.name"
        :loading
        :placeholder="$t('app.form.expense.fields.name-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.expense.fields.description')"
      name="description"
      size="xl"
      required
    >
      <UTextarea
        v-model="formModel.description"
        :loading
        :placeholder="$t('app.form.expense.fields.description-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.expense.fields.amount')"
      name="amount"
      size="xl"
      required
    >
      <UInput
        v-model="formModel.amount"
        type="number"
        :loading
        :placeholder="$t('app.form.expense.fields.amount-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.expense.fields.frequency')"
      name="frequency"
      size="xl"
      required
    >
      <BaseSelect
        v-model="formModel.frequency"
        :loading
        :options="CatalogExpenseFrequencyOptions"
        :placeholder="$t('app.form.expense.fields.frequency-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <div class="flex gap-2 justify-end">
      <UButton
        class="cursor-pointer"
        type="submit"
        :loading
        :label="$t('app.form.expense.submit')"
        :disabled="!isValid"
      />
      <UButton
        class="cursor-pointer"
        type="button"
        :loading
        variant="outline"
        :label="$t('app.form.expense.back')"
        :to="$localePath('panel-expenses')"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type Expense from '#shared/models/expense'
import { CatalogExpenseFrequencyOptions } from '#shared/helpers/catalogs'
import { z } from 'zod'

type FormModel = z.infer<typeof schema>

const { t } = useI18n()

const props = defineProps<{
  expense?: Expense
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormModel): void
}>()

const formModel = reactive<FormModel>({
  name: '',
  description: '',
  amount: 0,
  frequency: undefined as unknown as 'monthly' | 'yearly',
})

const schema = z.object({
  name: z
    .string()
    .min(1, { message: t('app.form.expense.fields.name-required') }),
  description: z
    .string()
    .min(1, { message: t('app.form.expense.fields.description-required') }),
  amount: z
    .number({ invalid_type_error: t('app.form.expense.fields.amount-invalid') })
    .min(1, { message: t('app.form.expense.fields.amount-min') }),
  frequency: z.enum(['monthly', 'yearly'], {
    required_error: t('app.form.expense.fields.frequency-required'),
  }),
})

const isValid = computed<boolean>(() => {
  return schema.safeParse(formModel).success
})

watch(
  () => props.expense,
  (expense) => {
    if (expense) {
      Object.assign(formModel, expense)
    }
  },
  { immediate: true }
)

function onSubmit({ data }: FormSubmitEvent<FormModel>) {
  emit('submit', data)
}
</script>
