import useWeatherApi from '@/composables/useWeatherApi'

export default defineEventHandler(async (event) => {
  const city = getRouterParam(event, 'city') as string

  const { getWeatherByCityName } = useWeatherApi()
  const weather = await getWeatherByCityName(city)

  return weather
})
