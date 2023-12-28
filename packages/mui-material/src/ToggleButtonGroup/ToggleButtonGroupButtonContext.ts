import * as React from 'react';

type ButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupButtonContext = React.createContext<ButtonPositionClassName | undefined>(
  undefined,
);

if (process.env.NODE_ENV !== 'production') {
  ToggleButtonGroupButtonContext.displayName = 'ToggleButtonGroupButtonContext';
}

export default ToggleButtonGroupButtonContext;
