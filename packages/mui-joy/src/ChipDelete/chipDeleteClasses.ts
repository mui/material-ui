import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ChipDeleteClasses {
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
  /** Styles applied to the root element if `variant="contained"`. */
  variantContained: string;
  /** Styles applied to the root element if `variant="light"`. */
  variantLight: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
}

export function getChipDeleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipDelete', slot);
}

const chipDeleteClasses: ChipDeleteClasses = generateUtilityClasses('MuiChipDelete', [
  'root',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantText',
  'variantContained',
  'variantLight',
  'variantOutlined',
]);

export default chipDeleteClasses;
