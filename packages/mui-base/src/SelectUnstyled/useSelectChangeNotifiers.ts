import * as React from 'react';
import { SelectChangeEventType } from './useSelect.types';

export interface SelectChangeNotifiers<TValue> {
  /**
   * Calls all the registered selection change handlers.
   *
   * @param event - The event that triggered the selection change.
   * @param newValue - The newly selected value(s).
   */
  notifySelectionChanged: (
    event: SelectChangeEventType,
    newValue: TValue | TValue[] | null,
  ) => void;
  /**
   * Calls all the registered highlight change handlers.
   *
   * @param event - The event that triggered the highlight change.
   * @param newValue - The newly highlighted value.
   */
  notifyHighlightChanged: (event: SelectChangeEventType, newValue: TValue | null) => void;
  /**
   * Functions to register and unregister selection and highlight change handlers.
   */
  registrationFunctions: {
    registerSelectionChangeHandler: (
      handler: (event: SelectChangeEventType, newValue: TValue | TValue[] | null) => void,
    ) => void;
    unregisterSelectionChangeHandler: (
      handler: (event: SelectChangeEventType, newValue: TValue | TValue[] | null) => void,
    ) => void;
    registerHighlightChangeHandler: (
      handler: (event: SelectChangeEventType, newValue: TValue | null) => void,
    ) => void;
    unregisterHighlightChangeHandler: (
      handler: (event: SelectChangeEventType, newValue: TValue | null) => void,
    ) => void;
  };
}

/**
 * @ignore - internal hook.
 *
 * This hook is used to notify any interested components about changes in the Select's selection and highlight.
 */
export default function useSelectChangeNotifiers<TValue>(): SelectChangeNotifiers<TValue> {
  const selectionChangeEventHandlers = React.useRef<
    Set<(e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void>
  >(new Set());

  const highlightChangeEventHandlers = React.useRef<
    Set<(e: SelectChangeEventType, newValue: TValue | null) => void>
  >(new Set());

  const notifySelectionChanged = React.useCallback(
    (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => {
      selectionChangeEventHandlers.current.forEach((handler) => handler(e, newValue));
    },
    [],
  );

  const notifyHighlightChanged = React.useCallback(
    (e: SelectChangeEventType, newValue: TValue | null) => {
      highlightChangeEventHandlers.current.forEach((handler) => handler(e, newValue));
    },
    [],
  );

  const registerSelectionChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void) => {
      selectionChangeEventHandlers.current.add(handler);
    },
    [],
  );

  const unregisterSelectionChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | TValue[] | null) => void) => {
      selectionChangeEventHandlers.current.delete(handler);
    },
    [],
  );

  const registerHighlightChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | null) => void) => {
      highlightChangeEventHandlers.current.add(handler);
    },
    [],
  );

  const unregisterHighlightChangeHandler = React.useCallback(
    (handler: (e: SelectChangeEventType, newValue: TValue | null) => void) => {
      highlightChangeEventHandlers.current.delete(handler);
    },
    [],
  );

  return {
    notifySelectionChanged,
    notifyHighlightChanged,
    registrationFunctions: {
      registerSelectionChangeHandler,
      unregisterSelectionChangeHandler,
      registerHighlightChangeHandler,
      unregisterHighlightChangeHandler,
    },
  };
}
