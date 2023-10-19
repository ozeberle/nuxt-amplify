// import { createClient } from 'contentful'
import { EntryCollection, EntrySkeletonType } from 'contentful'
import resolveResponse from 'contentful-resolve-response'
import { TypeLandingPageOd } from 'contentful/types'

export default function () {
  const config = useRuntimeConfig()

  const baseUrl = `${config.contentfulAPIBaseUrl}spaces/${config.contentfulSpaceID}/environments/${config.contentfulEnvironment}/entries`
  const searchParams = `?access_token=${config.contentfulDeliveryAccessToken}&include=10&limit=2`

  const fetch = async (slug: string, locale: string, contentType: string) => {
    const url = `${baseUrl}${searchParams}&content_type=${contentType}&fields.slug=${slug}&locale=${locale}`

    const { data } = await useFetch<EntryCollection<EntrySkeletonType>>(url, { key: 'contentful' })

    if (data.value?.items.length === 0) {
      // eslint-disable-next-line no-console
      console.error(`The slug "${slug}" doesn't exists`)
      return null
    }

    const { fields } = resolveResponse(data.value)[0] as TypeLandingPageOd<
      'WITHOUT_UNRESOLVABLE_LINKS',
      ''
    >

    return fields
  }

  return { fetch }
}
