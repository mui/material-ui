import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface CheckboxClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the checkbox element. */
  checkbox: string;
  /** Class name applied to the action element. */
  action: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the label element. */
  label: string;
  /** State class applied to the input component's `checked` class. */
  checked: string;
  /** State class applied to the input component's disabled class. */
  disabled: string;
  /** Class name applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** State class applied to the root element if `indeterminate={true}`. */
  indeterminate: string;
  /** Class name applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Class name applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Class name applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Class name applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Class name applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Class name applied to the root element when color inversion is triggered. */
  colorContext: string;
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type CheckboxClassKey = keyof CheckboxClasses;

export function getCheckboxUtilityClass(slot: string): string {
  return generateUtilityClass('MuiCheckbox', slot);
}

const checkboxClasses: CheckboxClasses = generateUtilityClasses('MuiCheckbox', [
  'root',
  'checkbox',
  'action',
  'input',
  'label',
  'checked',
  'disabled',
  'focusVisible',
  'indeterminate',
  'colorPrimary',
  'colorDanger',
  'colorNeutral',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default checkboxClasses;
