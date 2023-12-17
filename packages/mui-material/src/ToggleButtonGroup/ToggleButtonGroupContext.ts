import * as React from 'react';
import type { ToggleButtonGroupProps } from './ToggleButtonGroup';

interface IToggleButtonGroupContext {
  className?: string;
  onChange?: ToggleButtonGroupProps['onChange'];
  value?: any;
  size?: ToggleButtonGroupProps['size'];
  fullWidth?: boolean;
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
