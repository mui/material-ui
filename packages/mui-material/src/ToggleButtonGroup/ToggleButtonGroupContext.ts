'use client';
import * as React from 'react';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup';

interface ToggleButtonGroupContextType {
  className?: string;
  onChange?: ToggleButtonGroupProps['onChange'];
  value?: ToggleButtonGroupProps['value'];
  size?: ToggleButtonGroupProps['size'];
  fullWidth?: ToggleButtonGroupProps['fullWidth'];
  color?: ToggleButtonGroupProps['color'];
  disabled?: ToggleButtonGroupProps['disabled'];
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<ToggleButtonGroupContextType>({});

export default ToggleButtonGroupContext;
