export const NumberInputActionTypes = {
  clamp: 'numberInput:clamp',
  inputChange: 'numberInput:inputChange',
  increment: 'numberInput:increment',
  decrement: 'numberInput:decrement',
  decrementToMin: 'numberInput:decrementToMin',
  incrementToMax: 'numberInput:incrementToMax',
} as const;

interface NumberInputClampAction {
  type: typeof NumberInputActionTypes.clamp;
  inputValue: string;
}

interface NumberInputInputChangeAction {
  type: typeof NumberInputActionTypes.inputChange;
  inputValue: string;
}

interface NumberInputIncrementAction {
  type: typeof NumberInputActionTypes.increment;
  applyMultiplier: boolean;
}

interface NumberInputDecrementAction {
  type: typeof NumberInputActionTypes.decrement;
  applyMultiplier: boolean;
}

interface NumberInputIncrementToMaxAction {
  type: typeof NumberInputActionTypes.incrementToMax;
}

interface NumberInputDecrementToMinAction {
  type: typeof NumberInputActionTypes.decrementToMin;
}

export type NumberInputAction =
  | NumberInputClampAction
  | NumberInputInputChangeAction
  | NumberInputIncrementAction
  | NumberInputDecrementAction
  | NumberInputIncrementToMaxAction
  | NumberInputDecrementToMinAction;
