import { generateUtilityClass, generateUtilityClasses } from '../className';

export interface RadioClasses {
  /** Classname applied to the root element. */
  root: string;
  /** Classname applied to the radio element. */
  radio: string;
  /** Classname applied to the icon element. */
  icon: string;
  /** Classname applied to the action element. */
  action: string;
  /** Classname applied to the input element. */
  input: string;
  /** Classname applied to the label element. */
  label: string;
  /** State class applied to the root, action slots if `checked`. */
  checked: string;
  /** State class applied to the root, action slots if `disabled`. */
  disabled: string;
  /** Class applied to the root element if the switch has visible focus */
  focusVisible: string;
  /** Classname applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Classname applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Classname applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Classname applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Classname applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Classname applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Classname applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Classname applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Classname applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Classname applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Classname applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Classname applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type RadioClassKey = keyof RadioClasses;

export function getRadioUtilityClass(slot: string): string {
  return generateUtilityClass('JoyRadio', slot);
}

const radioClasses: RadioClasses = generateUtilityClasses('JoyRadio', [
  'root',
  'radio',
  'icon',
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
