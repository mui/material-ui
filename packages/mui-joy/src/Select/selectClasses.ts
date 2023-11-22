import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface SelectClasses {
  /** Class name applied to the root slot. */
  root: string;
  /** Class name applied to the button slot. */
  button: string;
  /** Class name applied to the indicator slot. */
  indicator: string;
  /** Class name applied to the startDecorator slot. */
  startDecorator: string;
  /** Class name applied to the endDecorator slot. */
  endDecorator: string;
  /** Class name applied to the popper slot. */
  popper: string;
  /** Class name applied to the listbox slot. */
  listbox: string;
  /** Class name applied to the root slot if `multiple=true` */
  multiple: string;
  /** Class name applied to the root slot if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root slot if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root slot if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root slot if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root slot if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root slot if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root slot if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root slot if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root slot if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root slot if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root slot if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root slot if `size="lg"`. */
  sizeLg: string;
  /** State class applied to the SelectBase root slot if the button is keyboard focused. */
  focusVisible: string;
  /** State class applied to the root slot if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root slot if listbox open. */
  expanded: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSelect', slot);
}

const selectClasses: SelectClasses = generateUtilityClasses('MuiSelect', [
  'root',
  'button',
  'indicator',
  'startDecorator',
  'endDecorator',
  'popper',
  'listbox',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'focusVisible',
  'disabled',
  'expanded',
  'multiple',
]);

export default selectClasses;
