<template>
  <div class="radio">
    <input
      :value="value"
      type="radio"
      :name="name"
      :checked="checked"
      v-bind="$attrs"
      @input="(event: Event) => {
        const target = event.target as HTMLInputElement
        if(target) $emit('change', target.value)
      }"
    >
    {{ title }}
  </div>
</template>

<script setup lang="ts">

import type { RadioButtonUIProps } from './RadioButtonUIProps'

defineProps<RadioButtonUIProps>()
defineEmits(['change'])

</script>

  <style lang="postcss" scoped>
  .radio {
    @apply flex gap-1 items-center ;
    & input[type=radio] {
        @apply shrink-0 items-center justify-center accent-[--primary-color];
        width: var(---6, 18px);
        height: var(---6, 18px);
      }
  }

  </style>
