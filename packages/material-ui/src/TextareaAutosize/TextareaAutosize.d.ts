import * as React from 'react';

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
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
declare const TextareaAutosize: React.ComponentType<
  TextareaAutosizeProps & {
    ref?: React.Ref<HTMLTextAreaElement>;
  }
>;

export default TextareaAutosize;
