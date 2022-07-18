import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SelectClasses {
  /** Styles applied to the root slot. */
  root: string;
  /** Styles applied to the popper slot. */
  popper: string;
  /** Styles applied to the listbox slot. */
  listbox: string;
  /** Styles applied to the root slot if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root slot if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root slot if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root slot if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root slot if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root slot if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root slot if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root slot if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root slot if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root slot if `variant="solid"`. */
  variantSolid: string;
  /** State class applied to the SelectBase root slot if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root slot if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root slot if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root slot if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root slot if `size="lg"`. */
  sizeLg: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClass(slot: string): string {
  return generateUtilityClass('JoySelect', slot);
}

const selectClasses: SelectClasses = generateUtilityClasses('JoySelect', [
  'root',
  'popper',
  'listbox',
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
  'focusVisible',
  'disabled',
  'sizeSm',
  'sizeMd',
  'sizeLg',
]);

export default selectClasses;
