import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface TextareaClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** Styles applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if `error={true}`. */
  error: string;
  /** Styles applied to the root element if the component is focused. */
  focused: string;
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
}

export type TextareaClassKey = keyof TextareaClasses;

export function getTextareaUtilityClass(slot: string): string {
  return generateUtilityClass('JoyTextarea', slot);
}

const textareaClasses: TextareaClasses = generateUtilityClasses('JoyTextarea', [
  'root',
  'input',
  'formControl',
  'disabled',
  'error',
  'focused',
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
]);

export default textareaClasses;
