import * as React from 'react';
import { TextboxOwnerState, type TextboxProps } from './Textbox.types';

export type TextboxContextValue = TextboxProps & {
  registerInput: (element: HTMLElement | null) => void;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  ownerState: TextboxOwnerState;
  defautValue?: unknown;
  value?: unknown;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextboxContext = React.createContext<TextboxContextValue | null>(null);
