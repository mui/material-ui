import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

type Direction = '+' | '-';

// extracted from handleValueChange
function getClampedValues(rawValue: number | undefined, context: NumberInputActionContext) {
  const { min, max, step } = context;

  const clampedValue = rawValue === undefined ? '' : clamp(rawValue, min, max, step);

  const newInputValue = clampedValue === undefined ? '' : String(clampedValue);

  return {
    value: clampedValue,
    inputValue: newInputValue,
  };
}

function stepValue(
  state: NumberInputState,
  context: NumberInputActionContext,
  direction: Direction,
  multiplier: number,
) {
  const { value } = state;
  const { step = 1, min, max } = context;

  if (isNumber(value)) {
    return {
      '+': value + (step ?? 1) * multiplier,
      '-': value - (step ?? 1) * multiplier,
    }[direction];
  }

  return {
    '+': min ?? 0,
    '-': max ?? 0,
  }[direction];
}

function handleClamp<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  inputValue: string,
) {
  const { getInputValueAsString } = context;

  const numberValueAsString = getInputValueAsString(inputValue);

  const intermediateValue =
    numberValueAsString === '' || numberValueAsString === '-'
      ? undefined
      : parseInt(numberValueAsString, 10);

  const clampedValues = getClampedValues(intermediateValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleInputChange<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  inputValue: string,
) {
  const { getInputValueAsString } = context;

  const numberValueAsString = getInputValueAsString(inputValue);

  if (numberValueAsString === '' || numberValueAsString === '-') {
    return {
      ...state,
      inputValue: numberValueAsString,
      value: '',
    };
  }

  if (numberValueAsString.match(/^-?\d+?$/)) {
    return {
      ...state,
      inputValue: numberValueAsString,
      value: parseInt(numberValueAsString, 10),
    };
  }

  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  direction: Direction,
  applyMultiplier: boolean,
) {
  const multiplier = applyMultiplier ? context.shiftMultiplier : 1;

  const newValue = stepValue(state, context, direction, multiplier);

  const clampedValues = getClampedValues(newValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleToMinOrMax<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  to: 'min' | 'max',
) {
  const newValue = context[to];

  if (!isNumber(newValue)) {
    return state;
  }

  return {
    ...state,
    value: newValue,
    inputValue: String(newValue),
  };
}

export function numberInputReducer(
  state: NumberInputState,
  action: NumberInputReducerAction,
): NumberInputState {
  const { type, context } = action;

  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, '+', action.applyMultiplier);
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, '-', action.applyMultiplier);
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    default:
      return state;
  }
}
