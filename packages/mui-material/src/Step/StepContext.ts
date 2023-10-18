import * as React from 'react';

export interface StepContextType {
  index: number;
  last: boolean;
  expanded: boolean;
  icon: React.ReactNode;
  active: boolean;
  completed: boolean;
  disabled: boolean;
}

/**
 * Provides information about the current step in Stepper.
 */
const StepContext = React.createContext<StepContextType | {}>({});

if (process.env.NODE_ENV !== 'production') {
  StepContext.displayName = 'StepContext';
}

/**
 * Returns the current StepContext or an empty object if no StepContext
 * has been defined in the component tree.
 */
export function useStepContext(): StepContextType | {} {
  return React.useContext(StepContext);
}

export default StepContext;
