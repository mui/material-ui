import * as React from 'react';

/**
 * @ignore - internal component.
 */
const RadioGroupContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

export default RadioGroupContext;
