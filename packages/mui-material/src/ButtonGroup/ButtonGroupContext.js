import * as React from 'react';

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
    ButtonGroupContext.displayName = 'ButtonGroupContext';
  }

export default ButtonGroupContext;
