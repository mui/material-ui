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

export type TextareaClassKey =
  | 'root'
  | 'shadow'
  | 'textarea'
  ;

declare const Textarea: StyledComponent<TextareaProps, TextareaClassKey>;

export default Textarea;
