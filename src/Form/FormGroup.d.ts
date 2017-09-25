import * as React from 'react';
import { StyledComponent } from '..';

export interface FormGroupProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  row?: boolean;
}

declare const FormGroup: StyledComponent<FormGroupProps>;

export default FormGroup;
