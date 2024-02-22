import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';

const COMPONENT_NAME = 'Textarea';

export interface TextareaClasses {
  /** Class name applied to the textarea element. */
  textarea: string;
  /** Class name applied to the textarea element if the component is a descendant of `FormControl`. */
  formControl: string;
  /** State class applied to the textarea element if the component is focused. */
  focused: string;
  /** State class applied to the textarea element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the textarea element if `error={true}`. */
  error: string;
  /** State class applied to the textarea element if `readOnly={true}`. */
  readOnly: string;
}

export type TextareaClassKey = keyof TextareaClasses;

export function getTextareaUtilityClass(slot: string): string {
  return generateUtilityClass(COMPONENT_NAME, slot);
}

export const textareaClasses: TextareaClasses = generateUtilityClasses(COMPONENT_NAME, [
  'formControl',
  'focused',
  'disabled',
  'error',
  'textarea',
  'readOnly',
]);
