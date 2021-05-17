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
