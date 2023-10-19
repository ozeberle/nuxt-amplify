<template>
  <div class="layout">
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

  <style lang="postcss" scoped>
  .layout {
    @apply w-full overflow-hidden;

    &__content {
      @apply flex flex-col gap-8 mx-auto px-4 w-full max-w-[980px];
    }
  }
  </style>
