<template>
  <aside
    class="fixed top-12 left-0 bottom-0 w-64 transition-transform duration-300 z-40 bg-(--ui-bg-muted)"
    :class="{ '-translate-x-full': !isOpen }"
  >
    <UNavigationMenu orientation="vertical" class="w-fill" :items />
  </aside>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('app.sidebar.dashboard'),
    icon: 'i-heroicons-chart-bar',
    to: localePath('panel-dashboard'),
  },
  {
    label: t('app.sidebar.incomes'),
    icon: 'i-heroicons-banknotes',
    to: localePath('panel-incomes'),
  },
  {
    label: t('app.sidebar.expenses'),
    icon: 'i-heroicons-credit-card',
    to: localePath('panel-expenses'),
  },
])
</script>
