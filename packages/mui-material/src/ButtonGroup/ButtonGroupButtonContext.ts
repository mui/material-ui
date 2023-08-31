import * as React from 'react';

interface ButtonGroupButtonContextType {
  isFirstButton?: boolean;
  isLastButton?: boolean;
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
