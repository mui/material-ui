export const NumberInputActionTypes = {
  clamp: 'numberInput:clamp',
  inputChange: 'numberInput:inputChange',
  increment: 'numberInput:increment',
  decrement: 'numberInput:decrement',
  decrementToMin: 'numberInput:decrementToMin',
  incrementToMax: 'numberInput:incrementToMax',
  resetInputValue: 'numberInput:resetInputValue',
} as const;

interface NumberInputClampAction {
  type: typeof NumberInputActionTypes.clamp;
  event: React.FocusEvent<HTMLInputElement>;
  inputValue: string;
}

interface NumberInputInputChangeAction {
  type: typeof NumberInputActionTypes.inputChange;
  event: React.ChangeEvent<HTMLInputElement>;
  inputValue: string;
}

interface NumberInputIncrementAction {
  type: typeof NumberInputActionTypes.increment;
  event: React.PointerEvent | React.KeyboardEvent;
  applyMultiplier: boolean;
}

interface NumberInputDecrementAction {
  type: typeof NumberInputActionTypes.decrement;
  event: React.PointerEvent | React.KeyboardEvent;
  applyMultiplier: boolean;
}

interface NumberInputIncrementToMaxAction {
  type: typeof NumberInputActionTypes.incrementToMax;
  event: React.KeyboardEvent;
}

interface NumberInputDecrementToMinAction {
  type: typeof NumberInputActionTypes.decrementToMin;
  event: React.KeyboardEvent;
}

interface NumberInputResetInputValueAction {
  type: typeof NumberInputActionTypes.resetInputValue;
}

export type NumberInputAction =
  | NumberInputClampAction
  | NumberInputInputChangeAction
  | NumberInputIncrementAction
  | NumberInputDecrementAction
  | NumberInputIncrementToMaxAction
  | NumberInputDecrementToMinAction
  | NumberInputResetInputValueAction;
