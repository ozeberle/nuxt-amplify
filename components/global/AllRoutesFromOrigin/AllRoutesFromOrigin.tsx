import type { FunctionalComponent } from 'vue'

import type { AllRoutesFromOriginProps } from './AllRoutesFromOriginUIProps'
import { AllRoutesFromOriginUI } from '#components'
import { TypeAllRoutesFromOrigin } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const AllRoutesFromOrigin: FunctionalComponent<TypeAllRoutesFromOrigin<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: AllRoutesFromOriginProps = {
    title: props.fields.title || '',
    originCity: props.fields.originCity,
    originCode: props.fields.originCode,
    destination: props.fields.destination,
    translations: props.fields.translations
  }

  return (
    <AllRoutesFromOriginUI {...dataUI} />
  )
}

export default AllRoutesFromOrigin
