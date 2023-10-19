import type { FunctionalComponent } from 'vue'

import type { TheHeaderUIProps } from './TheHeaderUIProps'
import { TheHeaderUI } from '#components'
import { TypeTheHeader } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const TheHeader: FunctionalComponent<TypeTheHeader<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: TheHeaderUIProps = {
    src: props.fields.logo?.fields.file?.url || '',
    alt: props.fields.title || props.fields.logo?.fields.description
  }

  return (
    <TheHeaderUI {...dataUI} />
  )
}

export default TheHeader
