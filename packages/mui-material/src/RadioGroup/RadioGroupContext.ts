import * as React from 'react';

export interface RadioGroupContextValue {
  name: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value: any;
}

/**
 * @ignore - internal component.
 */
const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

export default RadioGroupContext;
