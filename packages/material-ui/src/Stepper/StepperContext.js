import * as React from 'react';

/**
 * @ignore - internal component.
 */
const StepperContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  StepperContext.displayName = 'StepperContext';
}

export default StepperContext;
