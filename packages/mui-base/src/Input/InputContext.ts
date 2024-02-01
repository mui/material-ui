import * as React from 'react';
import { InputOwnerState, type InputProps } from './Input.types';

export type InputContextValue = InputProps & {
  registerInput: (element: HTMLElement | null) => void;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  ownerState: InputOwnerState;
  defautValue?: unknown;
  value?: unknown;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const InputContext = React.createContext<InputContextValue | null>(null);
