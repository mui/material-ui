import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
}

declare const Textarea: React.ComponentType<TextareaProps>;

export default TextareaAutosize;
