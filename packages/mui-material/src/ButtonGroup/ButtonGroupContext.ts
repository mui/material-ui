'use client';
import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup';

interface ButtonGroupContextType {
  className?: string;
  color?: ButtonGroupProps['color'];
  disabled?: boolean;
  disableElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonGroupProps['size'];
  variant?: ButtonGroupProps['variant'];
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextType>({});

export default ButtonGroupContext;
