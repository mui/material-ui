import * as React from 'react';
import { ButtonProps } from '../Button';

interface IButtonGroupContext {
  className?: string;
  color?: ButtonProps['color'];
  disabled?: boolean;
  disabledElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<IButtonGroupContext>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
