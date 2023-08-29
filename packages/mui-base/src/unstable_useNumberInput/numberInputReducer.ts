import {
  NumberInputActionContext,
  NumberInputReducerAction,
  NumberInputState,
} from './useNumberInput.types';
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp } from './utils';

// extracted from handleValueChange
function getNewValue(oldValue: number | undefined, context: NumberInputActionContext) {
  const { min, max, step } = context;

  const newValue = oldValue === undefined ? undefined : clamp(oldValue, min, max, step);

  const newInputValue = newValue === undefined ? '' : String(newValue);

  return {
    value: newValue,
    inputValue: newInputValue,
  };
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

  const newValues = getNewValue(intermediateValue, context);

  return {
    ...state,
    ...newValues,
  };
}

export function numberInputReducer(
  state: NumberInputState,
  action: NumberInputReducerAction,
): NumberInputState {
  const { type, context, event } = action;

  switch (type) {
    case NumberInputActionTypes.blur:
      return handleBlur(state, context, event);
    default:
      return state;
  }
}
