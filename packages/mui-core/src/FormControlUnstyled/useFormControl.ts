import * as React from 'react';
import FormControlUnstyledContext from './FormControlContext';

export default function useFormControlUnstyled() {
  return React.useContext(FormControlUnstyledContext);
}
