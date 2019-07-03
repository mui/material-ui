import React from 'react';

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext();

export function useFormControl() {
  return React.useContext(FormControlContext);
}

export default FormControlContext;
