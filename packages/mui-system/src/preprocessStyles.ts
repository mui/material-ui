import { internal_serializeStyles } from '@mui/styled-engine';

export default function preprocessStyles(input: any, layer?: string) {
  const { variants, ...style } = input;

  const result = {
    variants,
    style: internal_serializeStyles(style, layer) as any,
    isProcessed: true,
  };

  // Not supported on styled-components
  if (result.style === style) {
    return result;
  }

  if (variants) {
    variants.forEach((variant: any) => {
      if (typeof variant.style !== 'function') {
        variant.style = internal_serializeStyles(variant.style, layer);
      }
    });
  }

  return result;
}
