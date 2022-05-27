import { generateUtilityClass, generateUtilityClasses } from '@mui/base';

export interface RadioClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the input element. */
  radio: string;
  /** Styles applied to the action element. */
  action: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element. */
  label: string;
  /** State class applied to the input component's `checked` class. */
  checked: string;
  /** State class applied to the input component's disabled class. */
  disabled: string;
  /** Class applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
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
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type RadioClassKey = keyof RadioClasses;

export function getRadioUtilityClass(slot: string): string {
  return generateUtilityClass('JoyRadio', slot);
}

const radioClasses: RadioClasses = generateUtilityClasses('JoyRadio', [
  'root',
  'radio',
  'action',
  'input',
  'label',
  'checked',
  'disabled',
  'focusVisible',
  'colorPrimary',
  'colorDanger',
  'colorInfo',
  'colorNeutral',
  'colorSuccess',
  'colorWarning',
  'sizeSm',
  'sizeMd',
  'sizeLg',
  'variantOutlined',
  'variantSoft',
  'variantSolid',
]);

export default radioClasses;
