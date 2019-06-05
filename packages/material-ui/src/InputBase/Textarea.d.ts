import * as React from 'react';
import { StandardProps } from '..';

export interface TextareaProps
  extends StandardProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    TextareaClassKey,
    'defaultValue' | 'rows' | 'value'
  > {
  defaultValue?: unknown;
  disabled?: boolean;
  rows?: string | number;
  rowsMax?: string | number;
  textareaRef?: React.Ref<any> | React.RefObject<any>;
  value?: unknown;
}

export type TextareaClassKey = 'root' | 'shadow' | 'textarea';

declare const Textarea: React.ComponentType<TextareaProps>;

export default Textarea;
