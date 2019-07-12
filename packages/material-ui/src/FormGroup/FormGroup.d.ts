import * as React from 'react';
import { StandardProps } from '..';

export interface FormGroupProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, FormGroupClassKey> {
  row?: boolean;
}

export type FormGroupClassKey = 'root' | 'row';

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
