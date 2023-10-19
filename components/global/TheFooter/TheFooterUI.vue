<template>
  <div class="footer extended-content-container">
    <div class="footer__container extended-content">
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">

import type { TheFooterUIProps } from './TheFooterUIProps'

defineProps<TheFooterUIProps>()

</script>

<style lang="postcss" scoped>
.footer {
  @apply bg-primary;

  &__container {
    @apply py-4;
  }
}
</style>
