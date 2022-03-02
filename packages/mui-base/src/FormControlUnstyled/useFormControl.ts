import * as React from 'react';
import FormControlUnstyledContext, { FormControlUnstyledState } from './FormControlContext';

export default function useFormControlUnstyled<ExtraContextProps = any>() {
  return React.useContext(FormControlUnstyledContext) as
    | (FormControlUnstyledState & ExtraContextProps)
    | undefined;
}
