import React from 'react';
import FormControlContext from './FormControlContext';

export default function useFormControl() {
  return React.useContext(FormControlContext);
}
