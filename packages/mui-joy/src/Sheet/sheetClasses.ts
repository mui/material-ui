import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SheetClasses {
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
  /** Styles applied to the root element if `elevation="xs"`. */
  elevationXs: string;
  /** Styles applied to the root element if `elevation="sm"`. */
  elevationSm: string;
  /** Styles applied to the root element if `elevation="md"`. */
  elevationMd: string;
  /** Styles applied to the root element if `elevation="lg"`. */
  elevationLg: string;
  /** Styles applied to the root element if `elevation="xl"`. */
  elevationXl: string;
}

export type SheetClassKey = keyof SheetClasses;

export function getSheetUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSheet', slot);
}

const sheetClasses: SheetClasses = generateUtilityClasses('MuiSheet', [
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
  'elevationXs',
  'elevationSm',
  'elevationMd',
  'elevationLg',
  'elevationXl',
]);

export default sheetClasses;
