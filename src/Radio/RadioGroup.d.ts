import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { FormGroupProps } from '../Form';

export type RadioGroupProps = {
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  value?: string;
} & Omit<FormGroupProps, 'onChange'>;

export type RadioGroupClassKey =
  | 'root'
  ;

declare const RadioGroup: StyledComponent<RadioGroupProps, RadioGroupClassKey>;

export default RadioGroup;
