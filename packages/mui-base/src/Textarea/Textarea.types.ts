import type { FormControlState } from '../FormControl';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  error?: boolean;
  /**
   * @default false
   */
  readOnly?: boolean;
  value?: unknown;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: number;
  /**
   * The components used for each slot inside the Textarea.
   * Either a string to use a HTML element or a component.
   * @default '{}'
   */
  slots?: TextareaSlots;
}

export interface TextareaSlots {
  /**
   * The component that renders the textarea.
   * @default 'textarea'
   */
  textarea?: React.ElementType;
}

export type TextareaOwnerState = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  formControlContext: FormControlState | undefined;
  required: boolean;
  readOnly: boolean;
};
