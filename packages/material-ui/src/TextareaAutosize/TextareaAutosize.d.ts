import * as React from 'react';
import { Omit } from '..';

export interface TextareaAutosizeProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'rows'> {
  ref?: React.Ref<HTMLTextAreaElement>;
  /**
   * Minimum number of rows to display.
   * @deprecated Use `minRows` instead.
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display.
   * @deprecated Use `maxRows` instead.
   */
  rowsMax?: string | number;
  /**
   * Minimum number of rows to display.
   * @deprecated Use `minRows` instead.
   */
  rowsMin?: string | number;
  /**
   * Maximum number of rows to display.
   */
  maxRows?: string | number;
  /**
   * Minimum number of rows to display.
   */
  minRows?: string | number;
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://mui.com/components/textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://mui.com/api/textarea-autosize/)
 */
export default function TextareaAutosize(props: TextareaAutosizeProps): JSX.Element;
