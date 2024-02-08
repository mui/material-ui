import * as React from 'react';
import { TextareaOwnerState, type TextareaProps } from './Textarea.types';

export type TextareaContextValue = TextareaProps & {
  registerInput: (element: HTMLElement | null) => void;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  ownerState: TextareaOwnerState;
  defaultValue?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextareaContext = React.createContext<TextareaContextValue | null>(null);
