import * as React from 'react';

type ButtonGroupButtonContextClassNameValue = string;

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<
  ButtonGroupButtonContextClassNameValue | undefined
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupButtonContext.displayName = 'ButtonGroupButtonContext';
}

export default ButtonGroupButtonContext;
