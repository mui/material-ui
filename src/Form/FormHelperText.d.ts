import * as React from 'react';
import { StyledComponent } from '..';

export interface FormHelperTextProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  disabled?: boolean;
  error?: boolean;
  margin?: 'dense';
}

export default class FormHelperText extends StyledComponent<
  FormHelperTextProps
> {}
