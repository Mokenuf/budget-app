<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.expenses.edit.title', { id: $route.params.id ?? 'N/A' }) }}
    </h2>
    <FormExpense :expense :loading @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { expense, loading } = storeToRefs(useExpensesStore())
const { fetchExpenseById } = useExpensesStore()

const id = computed(() => Number(route.params.id))

function onSubmit(data) {
  console.log(data)
}

onMounted(async () => {
  await fetchExpenseById(id.value)
})
</script>
