import * as React from 'react';

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
  rowsMin?: string | number;
}

declare const TextareaAutosize: React.ComponentType<
  TextareaAutosizeProps & {
    ref?: React.Ref<HTMLTextAreaElement>;
  }
>;

export default TextareaAutosize;
