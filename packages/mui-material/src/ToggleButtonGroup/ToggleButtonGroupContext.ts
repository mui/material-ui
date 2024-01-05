import * as React from 'react';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup';

interface IToggleButtonGroupContext {
  className?: string;
  onChange?: ToggleButtonGroupProps['onChange'];
  value?: ToggleButtonGroupProps['value'];
  size?: ToggleButtonGroupProps['size'];
  fullWidth?: ToggleButtonGroupProps['fullWidth'];
  color?: ToggleButtonGroupProps['color'];
  disabled?: boolean;
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<IToggleButtonGroupContext>({});

if (process.env.NODE_ENV !== 'production') {
  ToggleButtonGroupContext.displayName = 'ToggleButtonGroupContext';
}

export default ToggleButtonGroupContext;
