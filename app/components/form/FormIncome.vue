<template>
  <UForm class="space-y-4" :state="formModel" :schema @submit="onSubmit">
    <UFormField
      :label="$t('app.form.income.fields.name')"
      name="name"
      size="xl"
      required
    >
      <UInput
        v-model="formModel.name"
        :placeholder="$t('app.form.income.fields.name-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.income.fields.description')"
      name="description"
      size="xl"
      required
    >
      <UTextarea
        v-model="formModel.description"
        :placeholder="$t('app.form.income.fields.description-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.income.fields.amount')"
      name="amount"
      size="xl"
      required
    >
      <UInput
        v-model="formModel.amount"
        type="number"
        :placeholder="$t('app.form.income.fields.amount-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.income.fields.type')"
      name="type"
      size="xl"
      required
    >
      <BaseSelect
        v-model="formModel.type"
        :options="CatalogIncomeTypeOptions"
        :placeholder="$t('app.form.income.fields.type-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <div class="flex gap-2 justify-end">
      <UButton
        class="cursor-pointer"
        type="submit"
        :label="$t('app.form.income.submit')"
        :disabled="!isValid"
      />
      <UButton
        class="cursor-pointer"
        type="button"
        variant="outline"
        :label="$t('app.form.income.back')"
        :to="$localePath('incomes')"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type Income from '#shared/models/income'
import { CatalogIncomeTypeOptions } from '#shared/helpers/catalogs'
import { z } from 'zod'

type FormModel = z.infer<typeof schema>

const { t } = useI18n()

const props = defineProps<{
  income?: Income
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormModel): void
}>()

const formModel = reactive<FormModel>({
  name: '',
  description: '',
  amount: 0,
  type: undefined as unknown as 'fixed' | 'extra',
})

const schema = z.object({
  name: z
    .string()
    .min(1, { message: t('app.form.income.fields.name-required') }),
  description: z
    .string()
    .min(1, { message: t('app.form.income.fields.description-required') }),
  amount: z
    .number({ invalid_type_error: t('app.form.income.fields.amount-invalid') })
    .min(1, { message: t('app.form.income.fields.amount-min') }),
  type: z.enum(['fixed', 'extra'], {
    required_error: t('app.form.income.fields.type-required'),
  }),
})

const isValid = computed<boolean>(() => {
  return schema.safeParse(formModel).success
})

watch(
  () => props.income,
  (income) => {
    if (income) {
      Object.assign(formModel, income)
    }
  },
  { immediate: true }
)

function onSubmit({ data }: FormSubmitEvent<FormModel>) {
  emit('submit', data)
}
</script>
