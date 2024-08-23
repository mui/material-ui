import { internal_serializeStyles } from '@mui/styled-engine';

export default function preprocessStyles(styles: any) {
  if (!styles || typeof styles !== 'object') {
    debugger
  }

  const variants = styles.variants
  styles.variants = undefined

  const serialized = internal_serializeStyles(styles) as any

  // Not supported on styled-components
  if (serialized === styles) {
    return styles;
  }

  if (variants) {
    variants.forEach((variant: any) => {
      if (typeof variant.style === 'function') {
        return variant
      }

      variant.style = internal_serializeStyles(variant.style)
    })

    serialized.variants = variants
  }

  return serialized;
}
