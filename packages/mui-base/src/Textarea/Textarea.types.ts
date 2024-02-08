import type { TextboxProps, TextboxOwnerState } from '../Textbox';

export type TextareaProps = TextboxProps & {
  /**
   * Maximum number of rows to display
   */
  maxRows?: number;
  /**
   * Minimum number of rows to display
   */
  minRows?: number;
  /**
   * Number of rows to display
   */
  rows?: number;
};

export type TextareaOwnerState = TextboxOwnerState & {
  maxRows?: number;
  minRows?: number;
  rows?: number;
};
