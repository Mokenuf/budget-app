<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold mb-2">{{ $t('pages.index.title') }}</h2>
    <AppDashboardCard :expenses="MOCK_EXPENSES" :income="MOCK_INCOMES" />
  </div>
</template>

<script setup lang="ts">
import { MOCK_EXPENSES, MOCK_INCOMES } from '../../mock-data'

const { t } = useI18n()
const { title } = useAppConfig()

useHead({
  title: `${t('pages.index.title')} | ${title}`,
})
</script>
