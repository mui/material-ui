import * as React from 'react';
import { UseFormControlContextReturnValue } from './FormControl.types';
import FormControlContext from './FormControlContext';
/**
 *
 * Demos:
 *
 * - [Form Control](https://mui.com/base/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlContext API](https://mui.com/base/react-form-control/hooks-api/#use-form-control-context)
 */
export default function useFormControlContext(): UseFormControlContextReturnValue | undefined {
  return React.useContext(FormControlContext);
}
