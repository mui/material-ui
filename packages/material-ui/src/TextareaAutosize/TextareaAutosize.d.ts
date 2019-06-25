import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
}

declare const TextareaAutosize: React.ComponentType<TextareaAutosizeProps>;

export default TextareaAutosize;
