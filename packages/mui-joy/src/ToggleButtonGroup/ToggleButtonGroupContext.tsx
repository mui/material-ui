import * as React from 'react';

interface IToggleButtonGroupContext {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    childValue: readonly string[] | string | number | undefined,
  ) => void;
  value?: string | (string | number)[] | null;
}

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupContext = React.createContext<IToggleButtonGroupContext>({});

export default ToggleButtonGroupContext;
