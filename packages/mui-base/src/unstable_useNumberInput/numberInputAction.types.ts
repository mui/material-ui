export const NumberInputActionTypes = {
  blur: 'numberInput:blur',
  focus: 'numberInput:focus',
  inputChange: 'numberInput:inputChange',
  keyDown: 'numberInput:keyDown',
  click: 'numberInput:click',
  increment: 'numberInput:increment',
  decrement: 'numberInput:decrement',
} as const;

interface NumberInputBlurAction {
  type: typeof NumberInputActionTypes.blur;
  event: React.FocusEvent<HTMLInputElement>;
}

interface NumberInputFocusAction {
  type: typeof NumberInputActionTypes.focus;
  event: React.FocusEvent;
}

interface NumberInputInputChangeAction {
  type: typeof NumberInputActionTypes.inputChange;
  event: React.ChangeEvent;
}

interface NumberInputKeyDownAction {
  type: typeof NumberInputActionTypes.keyDown;
  event: React.KeyboardEvent;
}

interface NumberInputClickAction {
  type: typeof NumberInputActionTypes.click;
  event: React.MouseEvent;
}

interface NumberInputIncrementAction {
  type: typeof NumberInputActionTypes.increment;
  event: React.PointerEvent | React.KeyboardEvent;
}

interface NumberInputDecrementAction {
  type: typeof NumberInputActionTypes.decrement;
  event: React.PointerEvent | React.KeyboardEvent;
}

export type NumberInputAction =
  | NumberInputBlurAction
  | NumberInputFocusAction
  | NumberInputInputChangeAction
  | NumberInputKeyDownAction
  | NumberInputClickAction
  | NumberInputIncrementAction
  | NumberInputDecrementAction;
