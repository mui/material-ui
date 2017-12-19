import * as React from 'react';
import { StandardProps } from '../MuiProps';

export interface FormGroupProps
  extends StandardProps<React.HtmlHTMLAttributes<HTMLDivElement>, FormGroupClassKey> {
  row?: boolean;
}

export type FormGroupClassKey = 'root' | 'row';

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
