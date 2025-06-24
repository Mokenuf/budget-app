<template>
  <UModal
    v-model:open="state.show"
    :title="state.title"
    :close="false"
    :overlay="false"
    :dismissable="false"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      {{ state.message }}
    </template>
    <template #footer>
      <UButton
        :label="$t('app.dialog.cancel')"
        variant="outline"
        @click="onCancel"
      />
      <UButton :label="$t('app.dialog.confirm')" @click="onConfirm" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const { $dialog } = useNuxtApp()
const state = $dialog.state

function onCancel() {
  state.show = false
  state.resolve(false)
}

function onConfirm() {
  state.show = false
  state.resolve(true)
}
</script>
