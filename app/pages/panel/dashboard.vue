<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.panel.dashboard.title') }}
    </h2>
    <AppDashboardCard :expenses :incomes :loading />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { title } = useAppConfig()
const { expenses, loading: expensesLoading } = storeToRefs(useExpensesStore())
const { incomes, loading: incomesLoading } = storeToRefs(useIncomesStore())
const { fetchAllExpenses } = useExpensesStore()
const { fetchAllIncomes } = useIncomesStore()

const loading = computed(() => expensesLoading.value || incomesLoading.value)

useHead({
  title: `${t('pages.panel.dashboard.title')} | ${title}`,
})

onMounted(async () => {
  await fetchAllExpenses()
  await fetchAllIncomes()
})
</script>
