import * as React from 'react';

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
  rowsMin?: string | number;
}

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/textarea-autosize Textarea Autosize}
 *
 * API:
 * - {@link https://material-ui.com/api/TextareaAutosize TextareaAutosize API}
 *
 */
declare const TextareaAutosize: React.ComponentType<
  TextareaAutosizeProps & {
    ref?: React.Ref<HTMLTextAreaElement>;
  }
>;

export default TextareaAutosize;
