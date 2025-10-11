'use client';
import * as React from 'react';
import type { ButtonGroupProps } from './ButtonGroup';

export type ButtonGroupItemHandle = { id: symbol };
export type ButtonGroupItemPosition = 'first' | 'middle' | 'last' | 'only';

interface ButtonGroupContextType {
  className?: string;
  color?: ButtonGroupProps['color'];
  disabled?: boolean;
  disableElevation?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  size?: ButtonGroupProps['size'];
  variant?: ButtonGroupProps['variant'];

  // Child button calls this once when it mounts
  register?: (node: HTMLElement | null) => ButtonGroupItemHandle;
  // Child Button calls this when it unmounts. The group removes that item from its live set.
  unregister?: (h: ButtonGroupItemHandle) => void;
  // Child Button calls this to ask "given all currently mounted group items, where am I?" The group looks at its ordered list and answers.
  getPosition?: (h: ButtonGroupItemHandle) => ButtonGroupItemPosition;
  // Simple counter to bump when the context value changes, so that children can re-evaluate their position.
  version?: number;
}

/**
 * @ignore - internal component.
 */
const ButtonGroupContext = React.createContext<ButtonGroupContextType>({});

if (process.env.NODE_ENV !== 'production') {
  ButtonGroupContext.displayName = 'ButtonGroupContext';
}

export default ButtonGroupContext;
