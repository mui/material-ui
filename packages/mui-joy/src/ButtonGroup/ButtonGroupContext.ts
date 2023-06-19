import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroupProps';

interface IButtonGroupContext {
  color?: ButtonGroupProps['color'];
  variant?: ButtonGroupProps['variant'];
  size?: ButtonGroupProps['size'];
  disabled?: boolean;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<IButtonGroupContext>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
