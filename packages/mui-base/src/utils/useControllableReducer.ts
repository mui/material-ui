import * as React from 'react';
import {
  ControllableReducerAction,
  ControllableReducerParameters,
  setStateActionType,
  StateChangeCallback,
  StateComparers,
} from './useControllableReducer.types';

function areEqual(a: any, b: any): boolean {
  return a === b;
}

const EMPTY_OBJECT = {};
const NOOP = () => {};

/**
 * Gets the current state augmented with controlled values from the outside.
 * If a state item has a corresponding controlled value, it will be used instead of the internal state.
 */
function getControlledState<State>(internalState: State, controlledProps: Partial<State>) {
  const augmentedState = { ...internalState };
  (Object.keys(controlledProps) as (keyof State)[]).forEach((key) => {
    if (controlledProps[key] !== undefined) {
      (augmentedState as Record<keyof State, any>)[key] = controlledProps[key];
    }
  });

  return augmentedState;
}

/**
 * Triggers the change event handler when reducer returns changed state.
 *
 * @param nextState The next state returned by the reducer.
 * @param internalPreviousState The previous state. If the component is controlled, this is merged with the props to determine the final state.
 * @param stateComparers Comparers for each state item. If a state item has a corresponding comparer, it will be used to determine if the state has changed.
 * @param onStateChange The change event handler.
 * @param controlledProps The external props used to override the state items.
 * @param lastActionRef The last action that was dispatched.
 */
function useStateChangeDetection<State extends {}>(
  nextState: State,
  internalPreviousState: State,
  stateComparers: StateComparers<State>,
  onStateChange: StateChangeCallback<State>,
  controlledProps: Partial<State>,
  lastActionRef: React.MutableRefObject<ControllableReducerAction | null>,
) {
  React.useEffect(() => {
    if (lastActionRef.current === null) {
      // Detect changes only if an action has been dispatched.
      return;
    }

    if (lastActionRef.current.type === setStateActionType) {
      // Don't fire change events when the value has been changed externally (e.g. by changing the controlled prop).
      return;
    }

    const previousState = getControlledState(internalPreviousState, controlledProps);

    (Object.keys(nextState) as (keyof State)[]).forEach((key) => {
      // go through all state keys and compare them with the previous state
      const stateComparer = stateComparers[key] ?? areEqual;

      const nextStateItem = nextState[key];
      const previousStateItem = previousState[key];

      if (!stateComparer(nextStateItem, previousStateItem)) {
        onStateChange?.(
          lastActionRef.current!.event ?? null,
          key,
          nextStateItem,
          lastActionRef.current!.type ?? '',
          nextState,
        );
      }
    });

    lastActionRef.current = null;
  }, [
    internalPreviousState,
    nextState,
    lastActionRef,
    onStateChange,
    stateComparers,
    controlledProps,
  ]);
}

/**
 * The alternative to `React.useReducer` that lets you control the state from the outside.
 *
 * It can be used in an uncontrolled mode, similar to `React.useReducer`, or in a controlled mode, when the state is controlled by the props.
 * It also supports partially controlled state, when some state items are controlled and some are not.
 *
 * The controlled state items are provided via the `controlledProps` parameter.
 * When a reducer action is dispatched, the internal state is updated with the new values.
 * A change event (`onStateChange`) is then triggered (for each changed state item) if the new state is different from the previous state.
 * This event can be used to update the controlled values.
 *
 * The comparison of the previous and next states is done using the `stateComparers` parameter.
 * If a state item has a corresponding comparer, it will be used to determine if the state has changed.
 * This is useful when the state item is an object and you want to compare only a subset of its properties or if it's an array and you want to compare its contents.
 *
 * An additional feature is the `actionAddOn` parameter. It allows you to add additional properties to every action object.
 *
 * @ignore - internal hook.
 */
export default function useControllableReducer<
  State extends {},
  Action extends ControllableReducerAction,
  ActionAddOn = {},
>(
  parameters: ControllableReducerParameters<State, Action, ActionAddOn>,
): [State, (action: Action) => void] {
  const actionRef = React.useRef<Action | null>(null);

  const {
    reducer,
    initialState,
    controlledProps = EMPTY_OBJECT,
    stateComparers = EMPTY_OBJECT,
    onStateChange = NOOP,
    actionAddOn,
  } = parameters;

  // The reducer that is passed to React.useReducer is wrapped with a function that augments the state with controlled values.
  const reducerWithControlledState = React.useCallback(
    (state: State, action: Action & ActionAddOn) => {
      const controlledState = getControlledState(state, controlledProps);
      return reducer(controlledState, action);
    },
    [controlledProps, reducer],
  );

  const [nextState, dispatch] = React.useReducer(reducerWithControlledState, initialState);

  // The action that is passed to dispatch is augmented with the actionAddOn.
  const dispatchWithAddOn = React.useCallback(
    (action: Action) => {
      actionRef.current = action;
      dispatch({
        ...action,
        ...actionAddOn,
      } as Action & ActionAddOn);
    },
    [actionAddOn],
  );

  const previousState = React.useRef<State>(initialState);

  React.useEffect(() => {
    previousState.current = nextState;
  }, [nextState]);

  useStateChangeDetection<State>(
    nextState,
    previousState.current,
    stateComparers ?? EMPTY_OBJECT,
    onStateChange ?? NOOP,
    controlledProps,
    actionRef,
  );

  return [getControlledState(nextState, controlledProps), dispatchWithAddOn];
}
