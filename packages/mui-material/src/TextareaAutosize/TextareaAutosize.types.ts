import * as React from 'react';

export interface TextareaAutosizeProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'rows'> {
  ref?: React.Ref<HTMLTextAreaElement>;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows?: string | number;
}
