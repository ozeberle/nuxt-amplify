<template>
  <div class="weather-section">
    <h2>Clima en {{ city }}</h2>
    <WeatherCarrousel :weather-data="weatherData" />
  </div>
</template>

<script setup lang="ts">
import { FormattedForecast } from 'composables/useWeatherApi'

const route = useRoute()
const slug = route.params.slug as string

const getDestinationCityFromSlug = () => {
  const isSlugInEnglish = slug.includes('-to-')
  const regex = isSlugInEnglish ? /-to-(.+)/ : /-a-(.+)/
  const matchResult = slug.match(regex)

  if (matchResult) {
    const destination = matchResult[1]
    return destination
  }
}

const destination = getDestinationCityFromSlug() as string
const city = capitalizeWords(destination.replace('-', ' '))

const getDestinationWeather = async () => {
  const { data: weather } = await useFetch<FormattedForecast[]>(`/api/weather/${destination}`)
  return weather
}

const weatherData = await getDestinationWeather()
</script>

<style lang="postcss" scoped>
.weather-section {
  @apply flex flex-col gap-6;
}
</style>
