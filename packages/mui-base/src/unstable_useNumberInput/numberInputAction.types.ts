export const NumberInputActionTypes = {
  blur: 'numberInput:blur',
  inputChange: 'numberInput:inputChange',
  keyDown: 'numberInput:keyDown',
  increment: 'numberInput:increment',
  decrement: 'numberInput:decrement',
} as const;

interface NumberInputBlurAction {
  type: typeof NumberInputActionTypes.blur;
  event: React.FocusEvent;
}

interface NumberInputInputChangeAction {
  type: typeof NumberInputActionTypes.inputChange;
  event: React.ChangeEvent;
}

interface NumberInputKeyDownAction {
  type: typeof NumberInputActionTypes.keyDown;
  event: React.KeyboardEvent;
  key: string;
}

interface NumberInputIncrementAction {
  type: typeof NumberInputActionTypes.increment;
  // triggering a button with the keyboard fires a PointerEvent
  event: React.PointerEvent;
}

interface NumberInputDecrementAction {
  type: typeof NumberInputActionTypes.decrement;
  // triggering a button with the keyboard fires a PointerEvent
  event: React.PointerEvent;
}

export type NumberInputAction =
  | NumberInputBlurAction
  | NumberInputInputChangeAction
  | NumberInputKeyDownAction
  | NumberInputIncrementAction
  | NumberInputDecrementAction;
