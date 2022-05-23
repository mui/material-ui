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
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
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
  return generateUtilityClass('JoySheet', slot);
}

const sheetClasses: SheetClasses = generateUtilityClasses('JoySheet', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'elevationXs',
  'elevationSm',
  'elevationMd',
  'elevationLg',
  'elevationXl',
]);

export default sheetClasses;
