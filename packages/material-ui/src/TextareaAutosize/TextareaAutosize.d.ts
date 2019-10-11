import * as React from 'react';

export interface TextareaAutosizeProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rowsMax?: string | number;
}

declare const TextareaAutosize: React.ComponentType<
  TextareaAutosizeProps & {
    ref?: TextareaAutosizeProps extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
  }
>;

export default TextareaAutosize;
