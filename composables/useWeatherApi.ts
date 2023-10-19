import { capitalizeWords } from '@/utils/helpers'

interface GeocodingData {
  name: string
  local_names: { [key: string]: string }
  lat: number
  lon: number
  country: string
  state: string
}

export interface FormattedForecast {
  id: number
  icon: string
  description: string
  temp: number
}
export interface Coord {
  lat: number | undefined
  lon: number | undefined
}
export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}
export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}
export interface Clouds {
  all: number
}

export interface Sys {
  pod: string
}

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: Sys
  dt_txt: Date
}

export interface ForecastData {
  cod: string
  message: number
  cnt: number
  list: List[]
  city: City
}

export default function () {
  const config = useRuntimeConfig()

  const getGeocodingByCityName = async (
    cityName: string
  ): Promise<Coord | undefined> => {
    const url = config.weatherAPIBaseUrl + '/geo/1.0/direct'

    const [{ lat, lon }] = await $fetch<GeocodingData[]>(url, {
      query: {
        q: cityName,
        appid: config.weatherAPIKey
      }
    })

    return { lat, lon }
  }

  const getForecastByGeocoding = async (
    geocoding: Coord
  ): Promise<FormattedForecast[] | undefined> => {
    const url = config.weatherAPIBaseUrl + '/data/2.5/forecast?'

    const forecast = await $fetch<ForecastData>(url, {
      query: {
        lat: geocoding.lat,
        lon: geocoding.lon,
        cnt: 7,
        units: 'metric',
        appid: config.weatherAPIKey
      }
    })

    const fomatedForecast = forecast?.list?.map(
      (day: List): FormattedForecast => ({
        id: day.weather[0].id,
        icon: getIconByWeatherId(day.weather[0].id),
        description: capitalizeWords(
          getDescriptionByWeatherId(day.weather[0].id)
        ),
        temp: Math.floor(day.main.temp_max)
        // TODO: add 'day' and 'date' fields when api changes
      })
    )

    return fomatedForecast
  }

  const getWeatherByCityName = async (
    cityName: string
  ): Promise<FormattedForecast[] | undefined> => {
    const geocoding = await getGeocodingByCityName(cityName)

    if (!geocoding) {
      console.error(`Goecoding not found for city ${cityName}`)
      return
    }

    const forecast = await getForecastByGeocoding(geocoding)
    return forecast
  }

  const getIconByWeatherId = (weatherId: number): string => {
    if (weatherId >= 200 && weatherId < 300) {
      return 'weather_stormy'
    }
    if (weatherId >= 300 && weatherId < 600) {
      return 'weather_rainy'
    }
    if (weatherId >= 600 && weatherId < 700) {
      return 'weather_snowy'
    }
    if (weatherId >= 700 && weatherId < 800) {
      return 'weather_foggy'
    }
    if (weatherId === 800) {
      return 'weather_sunny'
    }
    if (weatherId === 801) {
      return 'weather_partly-cloudy'
    }
    if (weatherId > 800 && weatherId < 900) {
      return 'weather_cloudy'
    }
    return 'weather_sunny'
  }

  const getDescriptionByWeatherId = (weatherId: number): string => {
    if (weatherId >= 200 && weatherId < 300) {
      return 'Tormenta'
    }
    if (weatherId >= 300 && weatherId < 600) {
      return 'Lluvioso'
    }
    if (weatherId >= 600 && weatherId < 700) {
      return 'Nieve'
    }
    if (weatherId >= 700 && weatherId < 800) {
      return 'Neblina'
    }
    if (weatherId === 800) {
      return 'Soleado'
    }
    if (weatherId === 801) {
      return 'Parcialmente nublado'
    }
    if (weatherId > 800 && weatherId < 900) {
      return 'Nublado'
    }
    return 'Soleado'
  }

  return { getWeatherByCityName }
}
