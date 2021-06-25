import * as React from 'react';
import { useOpenState } from './useOpenState';
import { WrapperVariant } from '../wrappers/WrapperVariantContext';
import { useUtils, MuiPickersAdapter } from './useUtils';

export interface PickerStateValueManager<TInputValue, TDateValue> {
  areValuesEqual: (
    utils: MuiPickersAdapter,
    valueLeft: TDateValue,
    valueRight: TDateValue,
  ) => boolean;
  emptyValue: TDateValue;
  parseInput: (utils: MuiPickersAdapter, value: TInputValue) => TDateValue;
}

export type PickerSelectionState = 'partial' | 'shallow' | 'finish';

interface Draftable<T> {
  committed: T;
  draft: T;
}

interface DraftAction<DraftValue> {
  type: 'update' | 'reset';
  payload: DraftValue;
}

export interface PickerStateProps<TInput, TDateValue> {
  disableCloseOnSelect?: boolean;
  open?: boolean;
  onAccept?: (date: TDateValue) => void;
  onChange: (date: TDateValue, keyboardInputValue?: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  value: TInput;
}

export function usePickerState<TInput, TDateValue>(
  props: PickerStateProps<TInput, TDateValue>,
  valueManager: PickerStateValueManager<TInput, TDateValue>,
) {
  const { disableCloseOnSelect, onAccept, onChange, value } = props;

  const utils = useUtils();
  const { isOpen, setIsOpen } = useOpenState(props);

  function initDraftableDate(date: TDateValue): Draftable<TDateValue> {
    return { committed: date, draft: date };
  }

  const parsedDateValue = valueManager.parseInput(utils, value);
  const [draftState, dispatch] = React.useReducer(
    (state: Draftable<TDateValue>, action: DraftAction<TDateValue>): Draftable<TDateValue> => {
      switch (action.type) {
        case 'reset':
          return initDraftableDate(action.payload);
        case 'update':
          return {
            ...state,
            draft: action.payload,
          };
        default:
          return state;
      }
    },
    parsedDateValue,
    initDraftableDate,
  );
  if (!valueManager.areValuesEqual(utils, draftState.committed, parsedDateValue)) {
    dispatch({ type: 'reset', payload: parsedDateValue });
  }

  // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field
  const [isMobileKeyboardViewOpen, setMobileKeyboardViewOpen] = React.useState(false);

  const acceptDate = React.useCallback(
    (acceptedDate: TDateValue, needClosePicker: boolean) => {
      onChange(acceptedDate);

      if (needClosePicker) {
        setIsOpen(false);

        if (onAccept) {
          onAccept(acceptedDate);
        }
      }
    },
    [onAccept, onChange, setIsOpen],
  );

  const wrapperProps = React.useMemo(
    () => ({
      open: isOpen,
      onClear: () => acceptDate(valueManager.emptyValue, true),
      onAccept: () => acceptDate(draftState.draft, true),
      onDismiss: () => setIsOpen(false),
      onSetToday: () => {
        const now = utils.date() as TDateValue;
        dispatch({ type: 'update', payload: now });
        acceptDate(now, !disableCloseOnSelect);
      },
    }),
    [
      acceptDate,
      disableCloseOnSelect,
      isOpen,
      utils,
      draftState.draft,
      setIsOpen,
      valueManager.emptyValue,
    ],
  );

  const pickerProps = React.useMemo(
    () => ({
      date: draftState.draft,
      isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: () => setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen),
      onDateChange: (
        newDate: TDateValue,
        wrapperVariant: WrapperVariant,
        selectionState: PickerSelectionState = 'partial',
      ) => {
        dispatch({ type: 'update', payload: newDate });
        if (selectionState === 'partial') {
          acceptDate(newDate, false);
        }

        if (selectionState === 'finish') {
          const shouldCloseOnSelect = !(disableCloseOnSelect ?? wrapperVariant === 'mobile');
          acceptDate(newDate, shouldCloseOnSelect);
        }

        // if selectionState === "shallow" do nothing (we already update the draft state)
      },
    }),
    [acceptDate, disableCloseOnSelect, isMobileKeyboardViewOpen, draftState.draft],
  );

  const inputProps = React.useMemo(
    () => ({
      onChange,
      open: isOpen,
      rawValue: value,
      openPicker: () => setIsOpen(true),
    }),
    [onChange, isOpen, value, setIsOpen],
  );

  const pickerState = { pickerProps, inputProps, wrapperProps };
  React.useDebugValue(pickerState, () => ({
    MuiPickerState: {
      pickerDraft: draftState,
      other: pickerState,
    },
  }));

  return pickerState;
}
