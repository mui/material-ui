import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface InputClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
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
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** Styles applied to the startDecorator element */
  startDecorator: string;
  /** Styles applied to the endDecorator element */
  endDecorator: string;
}

export type InputClassKey = keyof InputClasses;

export function getInputUtilityClass(slot: string): string {
  return generateUtilityClass('JoyInput', slot);
}

const inputClasses: InputClasses = generateUtilityClasses('JoyInput', [
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
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantPlain',
  'variantOutlined',
  'variantSoft',
  'fullWidth',
  'startDecorator',
  'endDecorator',
]);

export default inputClasses;
