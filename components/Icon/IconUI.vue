<template>
  <component :is="icon" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { IconUIProps } from './IconUIProps'

const props = defineProps<IconUIProps>()

const icon = defineAsyncComponent(() =>
  import(`../../assets/icons/${props.name}.svg`)
)
</script>
