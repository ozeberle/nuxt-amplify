<template>
  <img v-if="src" class="destination-image-section" :src="src" :alt="alt">
</template>

<script setup lang="ts">
import type { DestinationImageSectionUIProps } from './DestinationImageSectionUIProps'

defineProps<DestinationImageSectionUIProps>()
</script>

<style lang="postcss" scoped>
.destination-image-section {
  @apply w-full h-[250px] rounded-lg object-cover;
}
</style>
