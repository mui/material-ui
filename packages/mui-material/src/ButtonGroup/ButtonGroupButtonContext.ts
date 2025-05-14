'use client';
import * as React from 'react';

type ButtonPositionClassName = string;

/**
 * @ignore - internal component.
 */
const ButtonGroupButtonContext = React.createContext<ButtonPositionClassName | undefined>(
  undefined,
);

export default ButtonGroupButtonContext;
