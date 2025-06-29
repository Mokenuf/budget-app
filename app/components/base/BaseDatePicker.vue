<template>
  <div>
    <UPopover>
      <UButton icon="i-heroicons-calendar">
        <template v-if="type === 'date'">
          {{
            dateValue
              ? df.format(dateValue.toDate(getLocalTimeZone()))
              : $t(placeholder || '')
          }}
        </template>
        <template v-if="type === 'date-range'">
          <template v-if="rangeValue?.start">
            <template v-if="rangeValue.end">
              {{ df.format(rangeValue.start.toDate(getLocalTimeZone())) }} -
              {{ df.format(rangeValue.end.toDate(getLocalTimeZone())) }}
            </template>
            <template v-else>
              {{ df.format(rangeValue.start.toDate(getLocalTimeZone())) }}
            </template>
          </template>
          <template v-else>
            {{ $t(placeholder || '') }}
          </template>
        </template>
      </UButton>
      <template #content>
        <UCalendar
          v-model="model"
          class="p-2"
          :number-of-months="type === 'date' ? 1 : 2"
          :range="type === 'date-range'"
        />
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'

interface DateRange {
  start: CalendarDate
  end: CalendarDate
}

const { locale } = useI18n()

const props = defineProps<{
  dateStyle: 'full' | 'long' | 'medium' | 'short'
  modelValue: CalendarDate | DateRange
  placeholder: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: CalendarDate | DateRange): void
}>()

const dateValue = computed(() =>
  props.type === 'date' ? (props.modelValue as CalendarDate) : null
)

const model = computed<CalendarDate | DateRange>({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const rangeValue = computed(() =>
  props.type === 'date-range' && 'start' in props.modelValue
    ? (props.modelValue as DateRange)
    : null
)

const df = new DateFormatter(locale.value, {
  dateStyle: props.dateStyle,
})
</script>
