import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { FormGroupProps } from '../Form';

export type RadioGroupProps = {
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  value?: string;
} & Partial<Omit<FormGroupProps, 'onChange'>>;

declare const RadioGroup: StyledComponent<RadioGroupProps>;

export default RadioGroup;
