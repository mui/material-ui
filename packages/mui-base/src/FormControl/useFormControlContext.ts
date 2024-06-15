'use client';
import * as React from 'react';
import { UseFormControlContextReturnValue } from './FormControl.types';
import { FormControlContext } from './FormControlContext';
/**
 *
 * Demos:
 *
 * - [Form Control](https://next.mui.com/base-ui/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlContext API](https://next.mui.com/base-ui/react-form-control/hooks-api/#use-form-control-context)
 */
export function useFormControlContext(): UseFormControlContextReturnValue | undefined {
  return React.useContext(FormControlContext);
}
