import { Context } from 'react';
import { RadioGroupProps } from './RadioGroup';

// shut off automatic exporting
export {};

export interface RadioGroupState extends Pick<RadioGroupProps, 'name' | 'onChange' | 'value'> {}

export default function useRadioGroup(): RadioGroupState;
