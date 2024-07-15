import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface InputClasses {
  /** Class name applied to the root element. */
  root: string;
  /** Class name applied to the input element. */
  input: string;
  /** Class name applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Class name applied to the root element if the component is focused. */
  focused: string;
  /** Class name applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
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
  /** Class name applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Class name applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Class name applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Class name applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Class name applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Class name applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Class name applied to the root element if `variant="solid"`. */
  variantSolid: string;
  /** Class name applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Class name applied to the startDecorator element */
  startDecorator: string;
  /** Class name applied to the endDecorator element */
  endDecorator: string;
}

export type InputClassKey = keyof InputClasses;

export function getInputUtilityClass(slot: string): string {
  return generateUtilityClass('MuiInput', slot);
}

const inputClasses: InputClasses = generateUtilityClasses('MuiInput', [
  'root',
  'input',
  'formControl',
  'focused',
  'disabled',
  'error',
  'adornedStart',
  'adornedEnd',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorSuccess',
  'colorWarning',
  'colorContext',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
  'fullWidth',
  'startDecorator',
  'endDecorator',
]);

export default inputClasses;
