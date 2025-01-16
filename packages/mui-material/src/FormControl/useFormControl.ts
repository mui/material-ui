'use client';
import * as React from 'react';
import type { FormControlState } from './FormControlContext';
import FormControlContext from './FormControlContext';

export default function useFormControl(): FormControlState | undefined {
  return React.useContext(FormControlContext);
}
