'use client';
import * as React from 'react';

interface ToggleButtonGroupContextType {
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    childValue: React.ButtonHTMLAttributes<HTMLButtonElement>['value'],
  ) => void;
  value?: string | (string | number)[] | null;
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<ToggleButtonGroupContextType>({
  onClick: () => {},
  value: null,
});

export default ToggleButtonGroupContext;
