<template>
  <UForm class="space-y-4" :state="formModel" :schema @submit="onSubmit">
    <UFormField :label="$t('app.form.auth.sign-in.fields.email')" name="email">
      <UInput
        v-model="formModel.email"
        :loading
        :placeholder="$t('app.form.auth.sign-in.fields.email-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.auth.sign-in.fields.password')"
      name="password"
    >
      <UInput
        v-model="formModel.password"
        :type="show ? 'text' : 'password'"
        :loading
        :placeholder="$t('app.form.auth.sign-in.fields.password-placeholder')"
        required
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            class="cursor-pointer"
            size="sm"
            :icon="show ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>
    <div class="flex flex-col gap-2">
      <UButton
        class="cursor-pointer"
        type="submit"
        :loading
        :label="$t('app.form.auth.sign-in.submit')"
        :disabled="!isValid"
      />
      <UButton
        class="cursor-pointer p-0"
        variant="link"
        :label="$t('app.form.auth.sign-in.forgot-password')"
        :to="$localePath('auth-forgot-password')"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import { z } from 'zod'

type FormModel = z.infer<typeof schema>

const { t } = useI18n()

defineProps<{ loading?: boolean }>()

const emit = defineEmits<{
  (e: 'submit', data: FormModel): void
}>()

const formModel = reactive<FormModel>({
  email: '',
  password: '',
})

const schema = z.object({
  email: z
    .string()
    .email({ message: t('app.form.auth.sign-in.fields.email-invalid') })
    .min(1, { message: t('app.form.auth.sign-in.fields.email-required') }),
  password: z
    .string()
    .min(1, { message: t('app.form.auth.sign-in.fields.password-required') }),
})

const show = ref<boolean>(false)

const isValid = computed<boolean>(() => {
  return schema.safeParse(formModel).success
})

function onSubmit({ data }: FormSubmitEvent<FormModel>) {
  emit('submit', data)
}
</script>
