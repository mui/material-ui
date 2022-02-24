import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface SheetClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
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
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
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
