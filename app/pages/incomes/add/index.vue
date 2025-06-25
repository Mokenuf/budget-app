<template>
  <div>
    <h2 class="text-2xl font-bold mb-2">
      {{ $t('pages.incomes.add.title') }}
    </h2>
    <FormIncome :loading @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
const { loading } = storeToRefs(useIncomesStore())
const { createIncome } = useIncomesStore()

function onSubmit(data) {
  createIncome(data)
}
</script>
