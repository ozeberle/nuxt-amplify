<template>
  <div class="flex flex-col gap-1.5">
    <h2>{{ props.title }}</h2>
    <div class="grid grid-cols-3 gap-x-4">
      <AutoCompleteUI title="Desde" />
      <AutoCompleteUI title="Hasta" />
      <AutoCompleteUI title="Presupuesto máximo" />
    </div>
    <div class="w-full overflow-x-auto">
      <table class="border-collapse border-spacing-0 w-full text-[#002157]">
        <thead>
          <tr class="bg-[#002157]">
            <th v-for="header in tableHeaders" :key="header" class="text-white first:rounded-l-lg last:rounded-r-lg">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rows,index in mappedDataTable()" :key="index" class="border-b-2 border-red-[#2121211A] hover:bg-[#F5F9FF]">
            <td v-for="(tableData,indexData) in rows" :key="indexData" class="last:font-bold">
              {{ tableData }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import { APICheapestFlights, CheapestFlightsProps } from './CheapestFlightsUIProps'

const flightTypesLabel: any = {
  OW: 'Solo ida',
  RT: 'Ida y vuelda'
}

const props = defineProps<CheapestFlightsProps>()

const { data } = await useFetch<APICheapestFlights>('https://run.mocky.io/v3/27da81e0-6e19-4d8b-8401-c8fcc9e7d3f9')

const tableHeaders = ref(['Desde', 'Hasta', 'Tipo de tarifa', 'Fecha', 'Precio'])
// eslint-disable-next-line camelcase
const mappedDataTable = () => data.value?.results.map(({ origin, destination, flight_type, date, fare, currency }: any) => ({
  origin: `${origin.name}(${origin.iata})`,
  destination: `${destination.name}(${destination.iata})`,
  // eslint-disable-next-line camelcase
  flightType: flightTypesLabel[flight_type],
  date: moment(date).format('MMM DD, YYYY'),
  fare: `${currency} ${fare}`
}))
</script>

<style lang="postcss" scoped>
  th,
  td {
    @apply text-left p-2 whitespace-nowrap;
  }
</style>
