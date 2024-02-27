'use client';
import * as React from 'react';
import { SupportedValue, ToggleButtonGroupProps } from './ToggleButtonGroupProps';

interface ToggleButtonGroupContextType {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    childValue: React.ButtonHTMLAttributes<HTMLButtonElement>['value'],
  ) => void;
  value?: ToggleButtonGroupProps<SupportedValue>['value'];
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<ToggleButtonGroupContextType | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  ToggleButtonGroupContext.displayName = 'ToggleButtonGroupContext';
}

export default ToggleButtonGroupContext;
