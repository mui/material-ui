import * as React from 'react';
import { UseFormControlUnstyledContextReturnValue } from './FormControlUnstyled.types';
import FormControlUnstyledContext from './FormControlUnstyledContext';
/**
 *
 * Demos:
 *
 * - [Unstyled Form Control](https://mui.com/base/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlUnstyledContext API](https://mui.com/base/react-form-control/hooks-api/#use-form-control-unstyled-context)
 */
export default function useFormControlUnstyledContext():
  | UseFormControlUnstyledContextReturnValue
  | undefined {
  return React.useContext(FormControlUnstyledContext);
}
