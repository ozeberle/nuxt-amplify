import type { FunctionalComponent } from 'vue'

import type { CheapestFlightsProps } from './CheapestFlightsUIProps'
import { CheapestFlightsUI } from '#components'
import { TypeCheapestFlights } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const CheapestFlights: FunctionalComponent<TypeCheapestFlights<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: CheapestFlightsProps = {
    title: props.fields.title || '',
    translations: props.fields.translations
  }

  return (
    <CheapestFlightsUI {...dataUI} />
  )
}

export default CheapestFlights
