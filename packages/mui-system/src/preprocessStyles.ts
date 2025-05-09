import { internal_serializeStyles } from '@mui/styled-engine';

export function shallowLayer(serialized: any, layerName?: string, suffix?: string) {
  if (layerName && !serialized.styles.startsWith('@layer')) {
    // only add the layer if it is not already there.
    const rule = String(serialized.styles);
    serialized.styles = `@layer ${layerName}${suffix ? `-${suffix}` : ''}{${rule}}`;
  }
  return serialized;
}

export default function preprocessStyles(input: any, layerName?: string) {
  const { variants, ...style } = input;

  const serialized = shallowLayer(internal_serializeStyles(style), layerName) as any;
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
        variant.style = shallowLayer(
          internal_serializeStyles(variant.style),
          layerName,
          'variants',
        );
      }
    });
  }

  return result;
}
