import * as React from 'react';
import { StyledComponent } from '..';

export type FormControlLabelProps = {
  checked?: boolean | string;
  control: React.ReactElement<any>;
  disabled?: boolean;
  inputRef?: React.Ref<any>;
  label: React.ReactNode;
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, checked: boolean) => void;
  value?: string;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export default class FormControlLabel extends StyledComponent<
  FormControlLabelProps
> {}
