import * as React from 'react';
import { StyledComponent } from '..';

export interface FormGroupProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  row?: boolean;
}

export default class FormGroup extends StyledComponent<FormGroupProps> {}
