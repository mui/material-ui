import * as React from 'react';
import { unstable_useControlled as useControlled } from '@mui/utils';
import {
  ActionTypes,
  ListboxAction,
  ListboxReducer,
  ListboxState,
  UseListboxProps,
  UseListboxStrictProps,
} from './types';
import areArraysEqual from '../utils/areArraysEqual';

/**
 * Triggers change event handlers when reducer returns changed state.
 */
function useReducerReturnValueHandler<TOption>(
  state: ListboxState<TOption>,
  value: TOption | TOption[] | null,
  options: UseListboxProps<TOption>['options'],
  optionComparer: React.RefObject<(option: TOption, value: TOption) => boolean>,
  setValueState: (newValue: TOption | TOption[] | null) => void,
  onValueChange: UseListboxProps<TOption>['onChange'],
  onHighlightChange: UseListboxProps<TOption>['onHighlightChange'],
) {
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const onValueChangeRef = React.useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const onHighlightChangeRef = React.useRef(onHighlightChange);
  onHighlightChangeRef.current = onHighlightChange;

  React.useEffect(() => {
    if (Array.isArray(state.selectedValue)) {
      if (areArraysEqual(state.selectedValue, valueRef.current as TOption[])) {
        return;
      }
    } else if (
      (state.selectedValue == null && valueRef.current == null) ||
      (state.selectedValue != null &&
        valueRef.current != null &&
        optionComparer.current!(state.selectedValue as TOption, valueRef.current as TOption))
    ) {
      return;
    }

    setValueState(state.selectedValue);
    if (state.selectedValue != null) {
      // @ts-ignore We know that selectedValue has the correct type depending on `selectMultiple` prop.
      onValueChangeRef.current?.(state.selectedValue);
    }
  }, [state.selectedValue, setValueState, optionComparer]);

  React.useEffect(() => {
    // Fire the highlightChange event when reducer returns changed `highlightedIndex`.
    if (state.highlightedIndex === -1) {
      onHighlightChangeRef.current?.(null);
    } else {
      onHighlightChangeRef.current?.(options[state.highlightedIndex]);
    }
  }, [state.highlightedIndex, options]);
}

export default function useControllableReducer<TOption>(
  internalReducer: ListboxReducer<TOption>,
  externalReducer: ListboxReducer<TOption> | undefined,
  props: UseListboxStrictProps<TOption>,
): [ListboxState<TOption>, (action: ListboxAction<TOption>) => void] {
  const {
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
    onHighlightChange,
    options,
    optionComparer,
  } = props;

  const propsRef = React.useRef(props);
  propsRef.current = props;

  const [value, setValueState] = useControlled({
    controlled: controlledValue,
    default: defaultValue,
    name: 'useListbox',
  });

  const previousValueRef = React.useRef<TOption | TOption[] | null>(null);

  const [state, dispatch] = React.useReducer<ListboxReducer<TOption>>(
    externalReducer ?? internalReducer,
    {
      highlightedIndex: -1,
      selectedValue: value,
    } as ListboxState<TOption>,
  );

  const optionComparerRef = React.useRef(optionComparer);
  optionComparerRef.current = optionComparer;

  React.useEffect(() => {
    // Detect external changes to the controlled `value` prop and update the state.
    if (controlledValue === undefined) {
      return;
    }

    if (
      Array.isArray(controlledValue) &&
      Array.isArray(previousValueRef.current) &&
      areArraysEqual(
        previousValueRef.current as TOption[],
        controlledValue as TOption[],
        optionComparerRef.current,
      )
    ) {
      // `value` is an array and it did not change.
      return;
    }

    if (
      !Array.isArray(controlledValue) &&
      controlledValue != null &&
      previousValueRef.current != null &&
      optionComparerRef.current(controlledValue as TOption, previousValueRef.current as TOption)
    ) {
      // `value` is a single option and it did not change.
      return;
    }

    previousValueRef.current = controlledValue;
    dispatch({
      type: ActionTypes.setControlledValue,
      value: controlledValue,
      props: propsRef.current,
    });
  }, [controlledValue]);

  useReducerReturnValueHandler<TOption>(
    state,
    value,
    options,
    optionComparerRef,
    setValueState,
    onValueChange,
    onHighlightChange,
  );
  return [state, dispatch];
}
