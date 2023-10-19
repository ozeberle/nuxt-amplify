import type { FunctionalComponent } from 'vue'

import type { TheFooterUIProps } from './TheFooterUIProps'
import { TheFooterUI } from '#components'
import { TypeTheFooter } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const TheHeader: FunctionalComponent<TypeTheFooter<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: TheFooterUIProps = {
    title: props.fields.title
  }

  return (
    <TheFooterUI {...dataUI} />
  )
}

export default TheHeader
