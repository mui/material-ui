import * as React from 'react';

declare const ButtonGroupContext: React.Context<{
  className?: string;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  disabled?: boolean;
  disabledElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
}>;

export default ButtonGroupContext;
