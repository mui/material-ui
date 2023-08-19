import * as React from 'react';

interface IButtonGroupButtonContext {
  firstButton?: boolean;
  lastButton?: boolean;
  onlyChild?: boolean;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<IButtonGroupButtonContext | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

export default ButtonGroupButtonContext;
