import * as React from 'react';

interface IButtonGroupButtonContext {
  firstButton?: boolean;
  lastButton?: boolean;
  firstButtonClass?: string;
  lastButtonClass?: string;
  middleButtonClass?: string;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<IButtonGroupButtonContext>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

export default ButtonGroupButtonContext;
