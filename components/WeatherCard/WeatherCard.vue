<template>
  <div class="weather-card">
    <div class="weather-card__container">
      <IconUI class="weather-card__icon" :name="day.icon" filled />
      <span class="weather-card__day">Miércoles</span>
      <span class="weather-card__status">{{ day.description }}</span>
      <span class="weather-card__temp">{{ day.temp }}° C</span>
      <span class="weather-card__date">01 Jun</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconUI } from '#components'

defineProps({
  day: {
    type: Object,
    required: true
  }
})
</script>

<style lang="postcss" scoped>
.weather-card {
  &__container {
    @apply flex flex-col items-center gap-1 p-2 min-w-[79px] bg-white font-nunito text-primary rounded-lg border border-solid border-overlay-20 shadow-[0_5px_10px_0_rgba(33,33,33,0.05)];
  }

  &__icon {
    @apply w-10 h-10;
  }

  &__day, &__temp {
    @apply text-sm font-bold leading-[17.5px]
  }

  &__status {
    @apply items-center hidden text-center text-xs leading-[17.5px] min-h-[36px] lg:flex
  }

  &__date {
    @apply text-xs font-light leading-[17.5px]
  }

}
</style>
