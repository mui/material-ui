'use client';
import * as React from 'react';
import FormControlContext, { FormControlState } from './FormControlContext';

export default function useFormControl(): FormControlState | undefined {
  return React.useContext(FormControlContext);
}
