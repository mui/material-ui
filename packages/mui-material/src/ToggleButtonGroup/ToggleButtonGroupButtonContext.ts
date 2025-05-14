'use client';
import * as React from 'react';

type ToggleButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ToggleButtonGroupButtonContext = React.createContext<
  ToggleButtonPositionClassName | undefined
>(undefined);

export default ToggleButtonGroupButtonContext;
