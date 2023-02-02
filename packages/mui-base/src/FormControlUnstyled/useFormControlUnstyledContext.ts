import * as React from 'react';
import FormControlUnstyledContext from './FormControlUnstyledContext';

export default function useFormControlUnstyledContext(): React.ContextType<
  typeof FormControlUnstyledContext
> {
  return React.useContext(FormControlUnstyledContext);
}
