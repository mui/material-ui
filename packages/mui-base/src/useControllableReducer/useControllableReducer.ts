import * as React from 'react';
import {
  ListboxAction,
  ListboxReducer,
  ListboxState,
  UseListboxPropsWithDefaults,
} from './useListbox.types';
import areArraysEqual from '../utils/areArraysEqual';

/**
 * Gets the current state. If the selectedValue is controlled,
 * the `value` prop is the source of truth instead of the internal state.
 */
function getControlledState<TOption>(
  internalState: ListboxState<TOption>,
  props: UseListboxPropsWithDefaults<TOption>,
) {
  if (props.value !== undefined) {
    return { ...internalState, selectedValue: props.value };
  }

  return internalState;
}

function areOptionsEqual<TOption>(
  option1: TOption | null,
  option2: TOption | null,
  optionComparer: (optionA: TOption, optionB: TOption) => boolean,
) {
  if (option1 === option2) {
    return true;
  }

  if (option1 === null || option2 === null) {
    return false;
  }

  return optionComparer(option1, option2);
}

/**
 * Triggers change event handlers when reducer returns changed state.
 */
function useStateChangeDetection<TOption>(
  nextState: ListboxState<TOption>,
  internalPreviousState: ListboxState<TOption>,
  propsRef: React.RefObject<UseListboxPropsWithDefaults<TOption>>,
  hasDispatchedActionRef: React.MutableRefObject<boolean>,
) {
  React.useEffect(() => {
    if (!propsRef.current || !hasDispatchedActionRef.current) {
      // Detect changes only if an action has been dispatched.
      return;
    }

    hasDispatchedActionRef.current = false;

    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const { multiple, optionComparer } = propsRef.current;

    if (multiple) {
      const previousSelectedValues = (previousState?.selectedValue ?? []) as TOption[];
      const nextSelectedValues = nextState.selectedValue as TOption[];
      const onChange = propsRef.current.onChange as ((value: TOption[]) => void) | undefined;

      if (!areArraysEqual(nextSelectedValues, previousSelectedValues, optionComparer)) {
        onChange?.(nextSelectedValues);
      }
    } else {
      const previousSelectedValue = previousState?.selectedValue as TOption | null;
      const nextSelectedValue = nextState.selectedValue as TOption | null;
      const onChange = propsRef.current.onChange as ((value: TOption | null) => void) | undefined;

      if (!areOptionsEqual(nextSelectedValue, previousSelectedValue, optionComparer)) {
        onChange?.(nextSelectedValue);
      }
    }
  }, [nextState.selectedValue, internalPreviousState, propsRef, hasDispatchedActionRef]);

  React.useEffect(() => {
    if (!propsRef.current) {
      return;
    }

    // Fires the highlightChange event when reducer returns changed `highlightedValue`.
    if (
      !areOptionsEqual(
        internalPreviousState.highlightedValue,
        nextState.highlightedValue,
        propsRef.current.optionComparer,
      )
    ) {
      propsRef.current?.onHighlightChange?.(nextState.highlightedValue);
    }
  }, [nextState.highlightedValue, internalPreviousState.highlightedValue, propsRef]);
}

export default function useControllableReducer<TOption>(
  internalReducer: ListboxReducer<TOption>,
  externalReducer: ListboxReducer<TOption> | undefined,
  props: UseListboxPropsWithDefaults<TOption>,
): [ListboxState<TOption>, (action: ListboxAction<TOption>) => void] {
  const { value, defaultValue } = props;

  const propsRef = React.useRef(props);
  propsRef.current = props;

  const hasDispatchedActionRef = React.useRef(false);

  const initialSelectedValue =
    (value === undefined ? defaultValue : value) ?? (props.multiple ? [] : null);

  const initalState = {
    highlightedValue: null,
    selectedValue: initialSelectedValue,
  };

  const combinedReducer = React.useCallback(
    (state: ListboxState<TOption>, action: ListboxAction<TOption>) => {
      hasDispatchedActionRef.current = true;

      if (externalReducer) {
        return externalReducer(getControlledState(state, propsRef.current), action);
      }

      return internalReducer(getControlledState(state, propsRef.current), action);
    },
    [externalReducer, internalReducer, propsRef],
  );

  const [nextState, dispatch] = React.useReducer(combinedReducer, initalState);

  const previousState = React.useRef<ListboxState<TOption>>(initalState);
  React.useEffect(() => {
    previousState.current = nextState;
  }, [previousState, nextState]);

  useStateChangeDetection<TOption>(
    nextState,
    previousState.current,
    propsRef,
    hasDispatchedActionRef,
  );
  return [getControlledState(nextState, propsRef.current), dispatch];
}
