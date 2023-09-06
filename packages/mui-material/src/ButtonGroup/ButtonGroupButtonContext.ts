import * as React from 'react';

interface ButtonGroupButtonContextType {
  firstButtonClassName?: string;
  lastButtonClassName?: string;
  middleButtonClassName?: string;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<ButtonGroupButtonContextType | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

export default ButtonGroupButtonContext;
