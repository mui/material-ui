import * as React from 'react';

type ToggleButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupButtonContext = React.createContext<
  ToggleButtonPositionClassName | undefined
>(undefined);

if (process.env.NODE_ENV !== 'production') {
  ToggleButtonGroupButtonContext.displayName = 'ToggleButtonGroupButtonContext';
}

export default ToggleButtonGroupButtonContext;
