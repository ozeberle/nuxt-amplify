<template>
  <div ref="componentRef" class="dropdown">
    <button type="button" @click="showButtton">
      {{ title }} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div v-show="show" class="dropdown__content">
      <input v-model="inputValue" type="text" :placeholder="placeholder">
      <button type="button" @click="onSave">
        {{ buttonTitle }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { DropdownInputUIProps } from './DropdownInputUIProps'

defineProps<DropdownInputUIProps>()
const componentRef = ref()
useDetectOutsideClick(componentRef, () => {
  show.value = false
  emit('change', inputValue.value)
})
const inputValue = ref('')
const show = ref<boolean>(false)

const emit = defineEmits(['change'])

const showButtton = () => {
  show.value = !show.value
}
const onSave = () => {
  emit('change', inputValue.value)
}

</script>

<style lang="postcss" scoped>
.dropdown {
  @apply relative;

  & button{
    @apply text-[14px];
    @apply border rounded-sm border-[#21212133] border-solid;
    @apply  rounded-lg text-sm py-[6px] px-[8px] text-center inline-flex items-center;
  }

  &__content {
    @apply absolute z-10 top-4 mt-7 bg-white divide-y divide-gray-100 rounded-lg shadow p-[12px];
    @apply flex flex-col;

    & input{
      @apply p-[12px] ;
      @apply border rounded-md border-[#34373A] border-solid;
    }
    & button{
      @apply self-end shadow py-[12px] px-[16px] w-[68px] mt-1;
      @apply text-[16px] font-semibold rounded-md text-white bg-[#002157];
    }
  }

}

</style>
