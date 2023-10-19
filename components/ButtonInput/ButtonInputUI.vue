<template>
  <div class="button-input">
    <button type="button" @click="onSave">
      {{ title }}
    </button>
  </div>
</template>

<script setup lang="ts">

import type { ButtonInputUIProps } from './ButtonInputUIProps'

const onSave = () => {
  if (props.onSave) {
    emit('onSave', props.onSave())
  }
}

const props = defineProps<ButtonInputUIProps>()
const emit = defineEmits(['onSave'])

</script>

<style scoped lang="postcss">
.button-input {

    & button {
        @apply self-end shadow py-[12px] px-[16px]  mt-1;
        @apply text-[16px] font-semibold rounded-md text-white bg-[#002157];
    }
  }
</style>
