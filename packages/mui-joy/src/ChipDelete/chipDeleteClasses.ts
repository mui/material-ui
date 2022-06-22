import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface ChipDeleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
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
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
}

export function getChipDeleteUtilityClass(slot: string): string {
  return generateUtilityClass('JoyChipDelete', slot);
}

const chipDeleteClasses: ChipDeleteClasses = generateUtilityClasses('JoyChipDelete', [
  'root',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'variantPlain',
  'variantSolid',
  'variantSoft',
  'variantOutlined',
]);

export default chipDeleteClasses;
