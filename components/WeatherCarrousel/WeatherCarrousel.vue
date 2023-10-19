<template>
  <div class="weather-carrousel">
    <div class="weather-carrousel__container">
      <ul class="weather-carrousel__list">
        <li v-for="day in weatherData" :key="day.id" class="weather-carrousel__item">
          <WeatherCard :day="day" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormattedForecast } from 'composables/useWeatherApi'

defineProps({
  weatherData: {
    type: Object as PropType<FormattedForecast[] | null>,
    required: true
  }
})
</script>

<style lang="postcss" scoped>
.weather-carrousel {
  @apply -mr-4 md:mr-0;

  &__list {
    @apply flex gap-1 overflow-x-auto select-none;
    -ms-overflow-style: none; /* Hide scrollbar on Edge & IE */
    scrollbar-width: none; /* Hide scrollbar on Firefox */

    /* Hide scrollbar on Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__item {
    @apply min-w-[23%] md:min-w-0 md:w-full;
  }
}
</style>
