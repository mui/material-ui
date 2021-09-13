import * as React from 'react';

/**
 * @ignore - internal component.
 */
const StepContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  StepContext.displayName = 'StepContext';
}

export default StepContext;
