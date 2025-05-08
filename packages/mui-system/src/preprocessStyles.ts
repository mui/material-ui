import { internal_serializeStyles } from '@mui/styled-engine';

export default function preprocessStyles(input: any, layerName?: string) {
  const { variants, ...style } = input;

  const serialized = internal_serializeStyles(style) as any;
  if (layerName) {
    serialized.styles = `@layer ${layerName}{${serialized.styles}}`;
  }
  const result = {
    variants,
    style: serialized,
    isProcessed: true,
  };

  // Not supported on styled-components
  if (result.style === style) {
    return result;
  }

  if (variants) {
    variants.forEach((variant: any) => {
      if (typeof variant.style !== 'function') {
        variant.style = internal_serializeStyles(variant.style);
        if (layerName) {
          variant.style.styles = `@layer ${layerName}-variants{${variant.style.styles}}`;
        }
      }
    });
  }

  return result;
}
