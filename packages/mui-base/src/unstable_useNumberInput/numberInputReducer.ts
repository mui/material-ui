import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
  StepDirection,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clampStepwise, isNumber } from './utils';

function getClampedValues(rawValue: number | null, context: NumberInputActionContext) {
  const { min, max, step } = context;

  const clampedValue = rawValue === null ? null : clampStepwise(rawValue, min, max, step);

  const newInputValue = clampedValue === null ? '' : String(clampedValue);

  return {
    value: clampedValue,
    inputValue: newInputValue,
  };
}

function stepValue(
  state: NumberInputState,
  context: NumberInputActionContext,
  direction: StepDirection,
  multiplier: number,
) {
  const { value } = state;
  const { step = 1, min, max } = context;

  if (isNumber(value)) {
    return {
      up: value + (step ?? 1) * multiplier,
      down: value - (step ?? 1) * multiplier,
    }[direction];
  }

  return {
    up: min ?? 1,
    down: max ?? -1,
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
      ? null
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

  if (
    numberValueAsString.match(/^-?\d+?$/) ||
    numberValueAsString === '' ||
    numberValueAsString === '-'
  ) {
    return {
      ...state,
      inputValue: numberValueAsString,
    };
  }

  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  applyMultiplier: boolean,
  direction: StepDirection,
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
      return handleStep(state, context, action.applyMultiplier, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, 'down');
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    case NumberInputActionTypes.resetInputValue:
      return {
        ...state,
        inputValue: String(state.value),
      };
    default:
      return state;
  }
}
