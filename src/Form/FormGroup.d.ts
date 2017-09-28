import * as React from 'react';
import { StyledComponent } from '..';

export interface FormGroupProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  row?: boolean;
}

export type FormGroupClassKey =
  | 'root'
  | 'row'
  ;

declare const FormGroup: StyledComponent<FormGroupProps, FormGroupClassKey>;

export default FormGroup;
