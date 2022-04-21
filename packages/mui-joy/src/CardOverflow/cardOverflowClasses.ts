import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface CardOverflowClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `palette="primary"`. */
  palettePrimary: string;
  /** Styles applied to the root element if `palette="neutral"`. */
  paletteNeutral: string;
  /** Styles applied to the root element if `palette="danger"`. */
  paletteDanger: string;
  /** Styles applied to the root element if `palette="info"`. */
  paletteInfo: string;
  /** Styles applied to the root element if `palette="success"`. */
  paletteSuccess: string;
  /** Styles applied to the root element if `palette="warning"`. */
  paletteWarning: string;
  /** Styles applied to the root element if `variant="text"`. */
  variantText: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
}

export type CardOverflowClassKey = keyof CardOverflowClasses;

export function getCardOverflowUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCardOverflow', slot);
}

const aspectRatioClasses: CardOverflowClasses = generateUtilityClasses('MuiCardOverflow', [
  'root',
  'palettePrimary',
  'paletteNeutral',
  'paletteDanger',
  'paletteInfo',
  'paletteSuccess',
  'paletteWarning',
  'variantText',
  'variantOutlined',
  'variantLight',
  'variantContained',
]);

export default aspectRatioClasses;
