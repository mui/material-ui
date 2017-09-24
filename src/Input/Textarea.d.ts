import * as React from 'react';
import { StyledComponent } from '..';

export type TextareaProps = {
  defaultValue?: any;
  disabled?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  textareaRef?: React.Ref<any>;
  value?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

declare const Textarea: StyledComponent<TextareaProps>;

export default Textarea;
