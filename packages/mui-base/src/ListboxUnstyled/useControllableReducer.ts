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
  lastActionRef: React.MutableRefObject<ListboxAction<TOption> | null>,
) {
  React.useEffect(() => {
    if (!propsRef.current || lastActionRef.current === null) {
      // Detect changes only if an action has been dispatched.
      return;
    }

    const previousState = getControlledState(internalPreviousState, propsRef.current);
    const { multiple, optionComparer } = propsRef.current;

    if (multiple) {
      const previousSelectedValues = (previousState?.selectedValue ?? []) as TOption[];
      const nextSelectedValues = nextState.selectedValue as TOption[];
      const onChange = propsRef.current.onChange as
        | ((
            e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
            value: TOption[],
          ) => void)
        | undefined;

      if (!areArraysEqual(nextSelectedValues, previousSelectedValues, optionComparer)) {
        onChange?.(lastActionRef.current.event, nextSelectedValues);
      }
    } else {
      const previousSelectedValue = previousState?.selectedValue as TOption | null;
      const nextSelectedValue = nextState.selectedValue as TOption | null;
      const onChange = propsRef.current.onChange as
        | ((
            e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
            value: TOption | null,
          ) => void)
        | undefined;

      if (!areOptionsEqual(nextSelectedValue, previousSelectedValue, optionComparer)) {
        onChange?.(lastActionRef.current.event, nextSelectedValue);
      }
    }

    // Fires the highlightChange event when reducer returns changed `highlightedValue`.
    if (
      !areOptionsEqual(
        internalPreviousState.highlightedValue,
        nextState.highlightedValue,
        propsRef.current.optionComparer,
      )
    ) {
      propsRef.current?.onHighlightChange?.(
        lastActionRef.current.event,
        nextState.highlightedValue,
      );
    }

    lastActionRef.current = null;
  }, [
    nextState.selectedValue,
    nextState.highlightedValue,
    internalPreviousState,
    propsRef,
    lastActionRef,
  ]);
}

export default function useControllableReducer<TOption>(
  internalReducer: ListboxReducer<TOption>,
  externalReducer: ListboxReducer<TOption> | undefined,
  props: UseListboxPropsWithDefaults<TOption>,
): [ListboxState<TOption>, (action: ListboxAction<TOption>) => void] {
  const { value, defaultValue } = props;

  const propsRef = React.useRef(props);
  propsRef.current = props;

  const actionRef = React.useRef<ListboxAction<TOption> | null>(null);

  const initialSelectedValue =
    (value === undefined ? defaultValue : value) ?? (props.multiple ? [] : null);

  const initalState = {
    highlightedValue: null,
    selectedValue: initialSelectedValue,
  };

  const combinedReducer = React.useCallback(
    (state: ListboxState<TOption>, action: ListboxAction<TOption>) => {
      actionRef.current = action;

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

  useStateChangeDetection<TOption>(nextState, previousState.current, propsRef, actionRef);
  return [getControlledState(nextState, propsRef.current), dispatch];
}
