import * as React from 'react';

type ButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<ButtonPositionClassName | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

export default ButtonGroupButtonContext;
