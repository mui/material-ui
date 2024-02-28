import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Checkbox';

export interface CheckboxClasses {
  /** Class applied to the root element. */
  root: string;
  /** Class applied to the internal input element */
  input: string;
  /** Class applied to the track element */
  track: string;
  /** Class applied to the thumb element */
  thumb: string;
  /** State class applied to the root element if the checkbox is checked */
  checked: string;
  /** State class applied to the root element if the checkbox is disabled */
  disabled: string;
  /** State class applied to the root element if the checkbox has visible focus */
  focusVisible: string;
  /** Class applied to the root element if the checkbox is read-only */
  readOnly: string;
}

export type CheckboxClassKey = keyof CheckboxClasses;

export function getCheckboxUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const checkboxClasses: CheckboxClasses = generateUtilityClasses(COMPONENT_NAME, [
  'root',
  'input',
  'track',
  'thumb',
  'checked',
  'disabled',
  'focusVisible',
  'readOnly',
]);
