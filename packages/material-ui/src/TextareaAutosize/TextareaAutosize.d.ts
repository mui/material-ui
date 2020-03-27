import * as React from 'react';

export interface TextareaAutosizeProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'children' | 'rows'> {
  ref?: React.Ref<HTMLTextAreaElement>;
  /**
   * Use `rowsMin` instead. The prop will be removed in v5.
   *
   * @deprecated
   */
  rows?: string | number;
  /**
   * Maximum number of rows to display.
   */
  rowsMax?: string | number;
  /**
   * Minimum number of rows to display.
   */
  rowsMin?: string | number;
}

/**
 *
 * Demos:
 *
 * - [Textarea Autosize](https://material-ui.com/components/textarea-autosize/)
 *
 * API:
 *
 * - [TextareaAutosize API](https://material-ui.com/api/textarea-autosize/)
 */
export default function TextareaAutosize(props: TextareaAutosizeProps): JSX.Element;
