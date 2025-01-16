'use client';
import * as React from 'react';
import RadioGroupContext, { RadioGroupContextValue } from './RadioGroupContext';

export interface RadioGroupState extends RadioGroupContextValue {}

export default function useRadioGroup(): RadioGroupState | undefined {
  return React.useContext(RadioGroupContext);
}
