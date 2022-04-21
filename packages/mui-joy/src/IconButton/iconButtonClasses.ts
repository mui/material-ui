import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface IconButtonClasses {
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
  /** State class applied to the root element if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
}

export type IconButtonClassKey = keyof IconButtonClasses;

export function getIconButtonUtilityClass(slot: string): string {
  return generateUtilityClass('MuiIconButton', slot);
}

const iconButtonClasses: IconButtonClasses = generateUtilityClasses('MuiIconButton', [
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
  'focusVisible',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default iconButtonClasses;
