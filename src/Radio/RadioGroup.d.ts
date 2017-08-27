import * as React from 'react';
import { StyledComponent, Omit } from '..';
import { FormGroupProps } from '../Form';

export type RadioGroupProps = {
  name?: string;
  onChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  selectedValue?: string;
} & Partial<Omit<FormGroupProps, 'onChange'>>;

export default class RadioGroup extends StyledComponent<RadioGroupProps> {}
