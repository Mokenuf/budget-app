<template>
  <UForm class="space-y-4" :state="formModel" :schema @submit="onSubmit">
    <UFormField :label="$t('app.form.auth.sign-up.fields.email')" name="email">
      <UInput
        v-model="formModel.email"
        :loading
        :placeholder="$t('app.form.auth.sign-up.fields.email-placeholder')"
        class="w-full"
        required
      />
    </UFormField>
    <UFormField
      :label="$t('app.form.auth.sign-up.fields.password')"
      name="password"
    >
      <UInput
        v-model="formModel.password"
        :color="color"
        :type="show ? 'text' : 'password'"
        :loading
        :placeholder="$t('app.form.auth.sign-up.fields.password-placeholder')"
        required
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
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
    <UProgress
      :color="color"
      :indicator="text"
      :model-value="score"
      :max="5"
      size="sm"
    />
    <p id="password-strength" class="text-sm">
      {{ text }}. {{ $t('app.form.auth.sign-up.must-contain') }}
    </p>
    <ul class="space-y-1">
      <li
        v-for="(req, index) in passwordStrength"
        :key="index"
        class="flex items-center gap-0.5"
        :class="req.met ? 'text-success' : 'text-muted'"
      >
        <UIcon
          :name="req.met ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
          class="size-4 shrink-0"
        />
        <span class="text-xs"
          >{{ req.text
          }}<span class="sr-only">
            {{
              req.met
                ? $t('app.form.auth.sign-up.password-strength.met')
                : $t('app.form.auth.sign-up.password-strength.not-met')
            }}</span
          ></span
        >
      </li>
    </ul>
    <UFormField
      :label="$t('app.form.auth.sign-up.fields.confirm-password')"
      name="confirmPassword"
    >
      <UInput
        v-model="formModel.confirmPassword"
        :color="color"
        :type="showConfirm ? 'text' : 'password'"
        :loading
        :placeholder="
          $t('app.form.auth.sign-up.fields.confirm-password-placeholder')
        "
        required
        :ui="{ trailing: 'pe-1' }"
        class="w-full"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            class="cursor-pointer"
            size="sm"
            :icon="showConfirm ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
            @click="showConfirm = !showConfirm"
          />
        </template>
      </UInput>
    </UFormField>
    <div class="flex flex-col gap-2">
      <UButton
        class="cursor-pointer"
        type="submit"
        :loading
        :label="$t('app.form.auth.sign-up.submit')"
        :disabled="!isValid"
      />
      <UButton
        class="cursor-pointer p-0"
        variant="link"
        :label="$t('app.form.auth.sign-up.sign-in')"
        :to="$localePath('auth-sign-in')"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import type { ZodType } from 'zod'
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
  confirmPassword: '',
})

const passwordRules = [
  { regex: /.{8,}/, messageKey: 'min-length' },
  { regex: /\d/, messageKey: 'number' },
  { regex: /[a-z]/, messageKey: 'lowercase' },
  { regex: /[A-Z]/, messageKey: 'uppercase' },
  { regex: /[^a-zA-Z0-9]/, messageKey: 'special' },
]

const passwordSchema = passwordRules.reduce<ZodType<string>>(
  (schema, rule) =>
    schema.refine((val) => rule.regex.test(val), {
      message: t(`app.form.auth.sign-up.fields.password-${rule.messageKey}`),
    }),
  z
    .string()
    .min(1, { message: t('app.form.auth.sign-up.fields.password-required') })
)

const schema = z
  .object({
    email: z
      .string()
      .email({ message: t('app.form.auth.sign-up.fields.email-invalid') })
      .min(1, { message: t('app.form.auth.sign-up.fields.email-required') }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, {
      message: t('app.form.auth.sign-up.fields.confirm-password-required'),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: t('app.form.auth.sign-up.fields.confirm-password-missmatch'),
        code: z.ZodIssueCode.custom,
      })
    }
  })

const show = ref<boolean>(false)
const showConfirm = ref<boolean>(false)

const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value === 1) return 'error'
  if (score.value >= 5) return 'success'
  return 'warning'
})

const isValid = computed<boolean>(() => {
  return schema.safeParse(formModel).success
})

const passwordStrength = computed(() =>
  checkPasswordStrength(formModel.password)
)

const score = computed<number>(
  () => passwordStrength.value.filter((req) => req.met).length
)

const text = computed(() => {
  if (score.value === 0)
    return t('app.form.auth.sign-up.password-strength.enter')
  if (score.value === 1)
    return t('app.form.auth.sign-up.password-strength.weak')
  if (score.value >= 5)
    return t('app.form.auth.sign-up.password-strength.strong')
  return t('app.form.auth.sign-up.password-strength.medium')
})

function checkPasswordStrength(password: string) {
  return passwordRules.map((rule) => ({
    met: rule.regex.test(password),
    text: t(`app.form.auth.sign-up.fields.password-${rule.messageKey}`),
  }))
}

function onSubmit({ data }: FormSubmitEvent<FormModel>) {
  emit('submit', data)
}
</script>
