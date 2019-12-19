import { Context } from 'react';
import { RadioGroupProps } from './RadioGroup';

// shut off automatic exporting
export {};

type ContextFromPropsKey = 'name' | 'onChange' | 'value';

export interface RadioGroupState extends Pick<RadioGroupProps, ContextFromPropsKey> {}

export default function useRadioGroup(): RadioGroupState;
