<template>
  <label class="control control--checkbox">
    {{ title }}
    <input
      type="checkbox"
      v-bind="$attrs"
      @input="(event: Event) => {
        const target = event.target as HTMLInputElement
        if(valueTrue && valueFalse)
        {
          if(target.checked)
            $emit('change', valueTrue)
          else
            $emit('change', valueFalse)
        }else{
          $emit('change', target.checked)
        }
      }"
    >
    <div class="control__indicator" />
  </label>
</template>

<script setup lang="ts">
import type { CheckboxButtonUIProps } from './CheckboxButtonUIProps'

defineProps<CheckboxButtonUIProps>()
defineEmits(['change'])

</script>

  <style lang="postcss" scoped>
  /*Todo Change Tailwind */
  .control {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    font-size: 18px;
  }
   .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
   .control__indicator {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background: transparent;
    @apply border-solid border-2 border-[--primary-color];
  }
   .control:hover input ~ .control__indicator,
   .control input:focus ~ .control__indicator {
    background: transparent;
  }
   .control input:checked ~ .control__indicator {
    background: var(--primary-color);
  }
   .control:hover input:not([disabled]):checked ~ .control__indicator,
   .control input:checked:focus ~ .control__indicator {
    background: var(--primary-color);
  }
   .control input:disabled ~ .control__indicator {
    background: #e6e6e6;
    opacity: 0.6;
    pointer-events: none;
  }
   .control__indicator:after {
    content: '';
    position: absolute;
    display: none;
  }
   .control input:checked ~ .control__indicator:after {
    display: block;
  }
   .control--checkbox .control__indicator:after {
    left: 7px;
    top: 3px;
    width: 4px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
   .control--checkbox input:disabled ~ .control__indicator:after {
    border-color: #7b7b7b;
  }

  </style>
