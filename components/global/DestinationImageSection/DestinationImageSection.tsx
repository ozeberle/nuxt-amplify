import type { FunctionalComponent } from 'vue'

import type { DestinationImageSectionUIProps } from './DestinationImageSectionUIProps'
import { DestinationImageSectionUI } from '#components'
import { TypeDestinationImageSection } from 'contentful/types'

/**
 *
 * @param props The props object received by the content manager
 * @returns The Vue UI component with transformed data
 */
const DestinationImageSection: FunctionalComponent<TypeDestinationImageSection<'WITHOUT_UNRESOLVABLE_LINKS', ''>> = (
  props
) => {
  const dataUI: DestinationImageSectionUIProps = {
    alt: props.fields.title || 'Image',
    src: props.fields.destinationImage?.fields.file?.url || ''
  }

  return (
    <DestinationImageSectionUI {...dataUI} />
  )
}

export default DestinationImageSection
