'use client';
import * as React from 'react';

export interface StepperContextType {
  activeStep: number;
  alternativeLabel: boolean;
  connector: React.ReactNode;
  nonLinear: boolean;
  orientation: 'horizontal' | 'vertical';
  totalSteps: number;
}

/**
 * Provides information about the current step in Stepper.
 * @internal
 */
const StepperContext = React.createContext<StepperContextType | {}>({});

if (process.env.NODE_ENV !== 'production') {
  StepperContext.displayName = 'StepperContext';
}

/**
 * Returns the current StepperContext or an empty object if no StepperContext
 * has been defined in the component tree.
 */
export function useStepperContext(): StepperContextType | {} {
  const stepperContext = React.useContext(StepperContext);

  if (!stepperContext) {
    console.error('useStepperContext() called outside of a StepperContext provider.');
  }

  return stepperContext;
}

export const StepperContextProvider = StepperContext.Provider;
