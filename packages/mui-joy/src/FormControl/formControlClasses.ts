import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface FormControlClasses {
  /** Styles applied to the root element. */
  root: string;
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
  /** Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClass(slot: string): string {
  return generateUtilityClass('MuiFormControl', slot);
}

const formControlClasses: FormControlClasses = generateUtilityClasses('MuiFormControl', [
  'root',
  'error',
  'disabled',
  'colorPrimary',
  'colorNeutral',
  'colorDanger',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'horizontal',
  'vertical',
]);

export default formControlClasses;
