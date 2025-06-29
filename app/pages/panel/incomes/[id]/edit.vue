<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{
        $t('pages.panel.incomes.edit.title', { id: $route.params.id ?? 'N/A' })
      }}
    </h2>
    <FormIncome :income :loading @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { income, loading } = storeToRefs(useIncomesStore())
const { fetchIncomeById, updateIncome } = useIncomesStore()

const id = computed(() => Number(route.params.id))

function onSubmit(data) {
  updateIncome(id.value, data)
}

onMounted(async () => {
  await fetchIncomeById(id.value)
})
</script>
