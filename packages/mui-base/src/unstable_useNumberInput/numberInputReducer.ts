import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
  StepDirection,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

// extracted from handleValueChange
function getClampedValues(oldValue: number | undefined, context: NumberInputActionContext) {
  const { min, max, step } = context;

  const newValue = oldValue === undefined ? undefined : clamp(oldValue, min, max, step);

  const newInputValue = newValue === undefined ? '' : String(newValue);

  return {
    value: newValue,
    inputValue: newInputValue,
  };
}

function getMultiplier(context: NumberInputActionContext, event: React.SyntheticEvent) {
  const { shiftMultiplier } = context;
  return (event as React.PointerEvent).shiftKey ||
    (event as React.KeyboardEvent).key === 'PageUp' ||
    (event as React.KeyboardEvent).key === 'PageDown'
    ? shiftMultiplier
    : 1;
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
    up: min ?? 0,
    down: max ?? 0,
  }[direction];
}

function handleBlur<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  event: React.FocusEvent<HTMLInputElement>,
) {
  const { getInputValueAsString } = context;

  const parsedValue = getInputValueAsString(event.currentTarget.value);

  const intermediateValue =
    parsedValue === '' || parsedValue === '-' ? undefined : parseInt(parsedValue, 10);

  const clampedValues = getClampedValues(intermediateValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleStep<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  direction: StepDirection,
  multiplier: number,
) {
  const newValue = stepValue(state, context, direction, multiplier);

  const clampedValues = getClampedValues(newValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleKeyDown<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  event: React.KeyboardEvent,
) {
  switch (event.key) {
    default:
      break;
  }

  return state;
}

export function numberInputReducer(
  state: NumberInputState,
  action: NumberInputReducerAction,
): NumberInputState {
  const { type, context, event } = action;

  const multiplier = getMultiplier(context, event);

  switch (type) {
    case NumberInputActionTypes.blur:
      return handleBlur(state, context, event);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, 'up', multiplier);
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, 'down', multiplier);
    case NumberInputActionTypes.keyDown:
      return handleKeyDown(state, context, event);
    default:
      return state;
  }
}
