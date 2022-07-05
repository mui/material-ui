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
) {
  React.useEffect(() => {
    if (!propsRef.current) {
      return;
    }

    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const { multiple, optionComparer, onChange } = propsRef.current;

    if (multiple) {
      if (
        !areArraysEqual(
          nextState.selectedValue as TOption[],
          (previousState?.selectedValue ?? []) as TOption[],
          optionComparer,
        )
      ) {
        // TODO: type this properly
        onChange?.(nextState.selectedValue as any);
      }
    } else if (
      !areOptionsEqual(
        nextState.selectedValue as TOption,
        previousState?.selectedValue as TOption,
        propsRef.current.optionComparer,
      )
    ) {
      // TODO: type this properly
      onChange?.(nextState.selectedValue as any);
    }
  }, [nextState, internalPreviousState, propsRef]);

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
      // TODO: test this
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

  const initialSelectedValue =
    (value === undefined ? defaultValue : value) ?? (props.multiple ? [] : null);

  const initalState = {
    highlightedValue: null,
    selectedValue: initialSelectedValue,
  };

  const combinedReducer = React.useCallback(
    (state, action) => {
      if (externalReducer) {
        return externalReducer(getControlledState(state, propsRef.current), action);
      }

      return internalReducer(getControlledState(state, propsRef.current), action);
    },
    [externalReducer, internalReducer, propsRef],
  );

  // TODO: augment dispatch with props
  const [nextState, dispatch] = React.useReducer(combinedReducer, initalState);

  const previousState = React.useRef<ListboxState<TOption>>(initalState);
  React.useEffect(() => {
    previousState.current = nextState;
  }, [previousState, nextState]);

  useStateChangeDetection<TOption>(nextState, previousState.current, propsRef);
  return [getControlledState(nextState, propsRef.current), dispatch];
}
