import * as React from 'react';
import type { ButtonGroupOwnerState } from './ButtonGroupProps';

interface IButtonGroupContext {
  color?: ButtonGroupOwnerState['color'];
  variant?: ButtonGroupOwnerState['variant'];
  size?: ButtonGroupOwnerState['size'];
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<IButtonGroupContext>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
