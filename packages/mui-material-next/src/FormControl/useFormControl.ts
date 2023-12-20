'use client';
import * as React from 'react';
import FormControlContext, { FormControlContextValue } from './FormControlContext';

export default function useFormControl(): FormControlContextValue | undefined {
  return React.useContext(FormControlContext);
}
