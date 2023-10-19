<template>
  <div class="container">
    <h2>Todas las rutas desde {{ props.title }}</h2>
    <div class="routesContainer">
      <div v-for="route in routes" :key="route.label" class="route">
        <div><a :href="route.url">{{ route.label }}</a></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AllRoutesFromOriginProps } from './AllRoutesFromOriginUIProps'

const props = defineProps<AllRoutesFromOriginProps>()

const routes = props.destination?.map((destination: any) => ({
  label: `${props.originCity} (${props.originCode}) - ${destination}`,
  url: 'https://www.google.com.ar'
}))
</script>

<style lang="postcss" scoped>

  .container {
    @apply flex flex-col gap-1.5;
  }

  .routesContainer {
    @apply w-full grid gap-x-4 gap-y-0.5;
    grid-auto-rows: 3.5rem;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  }

  .route {
    @apply bg-[#F5F9FF] text-[#002157] rounded-lg py-1 px-4 flex items-center text-base font-normal;
  }
</style>
