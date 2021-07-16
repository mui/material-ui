import * as React from 'react';

/**
 * @ignore - internal component.
 */
const FormControlContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  FormControlContext.displayName = 'FormControlContext';
}

export default FormControlContext;
