import * as React from 'react';
import { StyledComponent } from '..';
import { FormLabelProps } from '../Form/FormLabel';

export interface InputLabelProps extends FormLabelProps {
  disableAnimation?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  required?: boolean;
  shrink?: boolean;
}

export default class InputLabel extends StyledComponent<InputLabelProps> {}
