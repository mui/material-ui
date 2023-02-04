import * as React from 'react';
import FormControlUnstyledContext from './FormControlUnstyledContext';
/**
 *
 * Demos:
 *
 * - [Unstyled Form Control](https://mui.com/base/react-form-control/#hook)
 *
 * API:
 *
 * - [useFormControlUnstyledContext API](https://mui.com/base/api/use-form-control-unstyled-context/)
 */
export default function useFormControlUnstyledContext(): React.ContextType<
  typeof FormControlUnstyledContext
> {
  return React.useContext(FormControlUnstyledContext);
}
