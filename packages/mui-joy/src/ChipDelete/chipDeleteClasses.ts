import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface ChipDeleteClasses {
  /** Class name applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if keyboard focused. */
  focusVisible: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
}

export function getChipDeleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiChipDelete', slot);
}

const chipDeleteClasses: ChipDeleteClasses = generateUtilityClasses('MuiChipDelete', [
  'root',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantSolid',
  'variantSoft',
  'variantOutlined',
]);

export default chipDeleteClasses;
