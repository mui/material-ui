import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
  StepDirection,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

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

function getDirection(key: string) {
  return {
    ArrowUp: 'up',
    ArrowDown: 'down',
    PageUp: 'up',
    PageDown: 'down',
    Home: 'up',
    End: 'down',
  }[key] as StepDirection;
}

function handleBlur<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  event: React.FocusEvent,
) {
  const { getInputValueAsString } = context;

  const parsedValue = getInputValueAsString((event.currentTarget as HTMLInputElement).value);

  const intermediateValue =
    parsedValue === '' || parsedValue === '-' ? undefined : parseInt(parsedValue, 10);

  const clampedValues = getClampedValues(intermediateValue, context);

  return {
    ...state,
    ...clampedValues,
  };
}

function handleInputChange<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  event: React.ChangeEvent,
) {
  const { getInputValueAsString } = context;

  const parsedValue = getInputValueAsString((event.currentTarget as HTMLInputElement).value);

  if (parsedValue === '' || parsedValue === '-') {
    return {
      ...state,
      inputValue: parsedValue,
      value: '',
    };
  }

  if (parsedValue.match(/^-?\d+?$/)) {
    return {
      ...state,
      inputValue: parsedValue,
      value: parseInt(parsedValue, 10),
    };
  }

  return state;
}

function handleStep<State extends NumberInputState>(
  state: State,
  context: NumberInputActionContext,
  event: React.PointerEvent,
  direction: StepDirection,
) {
  const multiplier = event.shiftKey ? context.shiftMultiplier : 1;

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
  key: string,
) {
  const { min, max, shiftMultiplier } = context;

  const multiplier = event.shiftKey || key === 'PageUp' || key === 'PageDown' ? shiftMultiplier : 1;

  switch (key) {
    case 'ArrowUp':
    case 'ArrowDown':
    case 'PageUp':
    case 'PageDown': {
      const direction = getDirection(key);

      const newValue = stepValue(state, context, direction, multiplier);

      const clampedValues = getClampedValues(newValue, context);

      return {
        ...state,
        ...clampedValues,
      };
    }

    case 'Home': {
      if (!isNumber(max)) {
        break;
      }

      return {
        ...state,
        value: max,
        inputValue: String(max),
      };
    }

    case 'End': {
      if (!isNumber(min)) {
        break;
      }
      return {
        ...state,
        value: min,
        inputValue: String(min),
      };
    }

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

  switch (type) {
    case NumberInputActionTypes.blur:
      return handleBlur(state, context, event);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, event);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, event, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, event, 'down');
    case NumberInputActionTypes.keyDown:
      return handleKeyDown(state, context, event, action.key);
    default:
      return state;
  }
}
