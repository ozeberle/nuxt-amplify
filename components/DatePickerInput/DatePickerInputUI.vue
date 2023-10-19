<template>
  <div class="datepicker">
    <div class="datepicker__from">
      <label for="label-from">Fecha ida</label>
      <VueDatePicker
        :model-value="dateF"
        locale="es"
        :enable-time-picker="false"
        :range="!onlyFrom"
        :max-date="maxDate"
        :min-date="new Date()"
        auto-apply
        :format="format"
        multi-calendars
        :partial-range="!onlyFrom"
        input-class-name="dp-custom-input"
        @update:model-value="handleDate"
      >
        <template #input-icon>
          <IconUI name="calendar" class="icon-calendar" />
        </template>
      </VueDatePicker>
    </div>
    <div class="datepicker__to">
      <label for="label-from">Fecha vuelta</label>
      <VueDatePicker
        v-model="dateT"
        :disabled="onlyFrom"
        locale="es"
        :enable-time-picker="false"
        :range="!onlyFrom"
        auto-apply
        :max-date="maxDate"
        :min-date="new Date()"
        :format="formatT"
        multi-calendars
        input-class-name="dp-custom-input"
        :partial-range="!onlyFrom"
        @update:model-value="handleDate"
      >
        <template #input-icon>
          <IconUI name="calendar" class="icon-calendar" />
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import moment from 'moment'
import type { DatePickerInputUIProps } from './DatePickerInputUIProps'

const props = defineProps<DatePickerInputUIProps>()
const emit = defineEmits(['update:dateFrom', 'update:dateTo'])
const dateF = ref()
const dateT = ref()

const maxDate = computed(() => new Date(new Date().setDate(new Date().getDate() + 355)))

const format = (date:[Date, Date]|Date) => {
  if (isArray(date)) {
    return moment(date[0]).format('DD MMM yyyy')
  } else { return moment(date).format('DD MMM yyyy') }
}
const formatT = (date:[Date, Date]|Date) => {
  if (isArray(date)) {
    return moment(date[1]).format('DD MMM yyyy')
  } else { return moment(date).format('DD MMM yyyy') }
}

const handleDate = (modelData:[Date, Date] | Date) => {
  let _dateF, _dateT
  if (isArray(modelData)) {
    _dateF = modelData[0]
    _dateT = modelData[1]
  } else {
    _dateF = modelData
  }
  emit('update:dateFrom', _dateF)
  dateF.value = modelData
  if (!props.onlyFrom) {
    emit('update:dateTo', _dateT)
    dateT.value = modelData
  }
}

onMounted(() => {
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  if (props.onlyFrom) {
    dateF.value = startDate
  } else {
    dateF.value = [startDate, endDate]
    dateT.value = [startDate, endDate]
  }
})

</script>

<style lang="postcss" scoped>

.datepicker {
  @apply flex gap-2;

  .icon-calendar{
    @apply relative left-2 text-[#34373A];
  }
  .dp__main{
    @apply mt-1;

  }

  &__from{
    label {
      @apply text-[14px] mb-2;
    }

  }
  &__to{
    label {
      @apply text-[14px];
    }

  }
}

</style>
