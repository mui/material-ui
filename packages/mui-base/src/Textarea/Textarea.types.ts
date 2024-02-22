import type { FormControlState } from '../FormControl';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  error?: boolean;
  /**
   * @default false
   */
  readOnly?: boolean;
  value?: string;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: number;
}

export type TextareaOwnerState = {
  disabled: boolean;
  error: boolean;
  focused: boolean;
  formControlContext: FormControlState | undefined;
  required: boolean;
  readOnly: boolean;
};
