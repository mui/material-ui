import { useOpenState } from './useOpenState';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow, MuiPickersAdapter } from './useUtils';
import { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';

export const FORCE_FINISH_PICKER = Symbol('Force closing picker, useful for accessibility');

export function usePickerState<TInput, TDateValue>(
  props: BasePickerProps<TInput, TDateValue>,
  valueManager: {
    parseInput: (
      now: MaterialUiPickersDate,
      utils: MuiPickersAdapter,
      props: BasePickerProps<TInput, TDateValue>
    ) => TDateValue;
    emptyValue: TDateValue;
    areValuesEqual: (valueLeft: TDateValue, valueRight: TDateValue) => boolean;
  }
) {
  const { autoOk, inputFormat, disabled, readOnly, onAccept, onChange, value } = props;

  if (!inputFormat) {
    throw new Error('inputFormat prop is required');
  }

  const now = useNow();
  const utils = useUtils();
  const date = valueManager.parseInput(now, utils, props);
  const [pickerDate, setPickerDate] = useState(date);

  // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field
  const [isMobileKeyboardViewOpen, setMobileKeyboardViewOpen] = useState(false);
  const { isOpen, setIsOpen } = useOpenState(props);

  useEffect(() => {
    setPickerDate(currentPickerDate => {
      if (!valueManager.areValuesEqual(currentPickerDate, date)) {
        return date;
      }

      return currentPickerDate;
    });
    // We need to react only on value change, because `date` could potentially return new Date() on each render
  }, [value, utils]); // eslint-disable-line

  const acceptDate = useCallback(
    (acceptedDate: TDateValue, needClosePicker: boolean) => {
      onChange(acceptedDate);

      if (needClosePicker) {
        setIsOpen(false);

        if (onAccept) {
          onAccept(acceptedDate);
        }
      }
    },
    [onAccept, onChange, setIsOpen]
  );

  const wrapperProps = useMemo(
    () => ({
      open: isOpen,
      onClear: () => acceptDate(valueManager.emptyValue, true),
      onAccept: () => acceptDate(pickerDate, true),
      onDismiss: () => setIsOpen(false),
      onSetToday: () => {
        // TODO FIX ME
        setPickerDate(now as any);
        acceptDate(now as any, Boolean(autoOk));
      },
    }),
    [acceptDate, autoOk, isOpen, now, pickerDate, setIsOpen, valueManager.emptyValue]
  );

  const pickerProps = useMemo(
    () => ({
      date: pickerDate,
      isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: () => {
        if (!isMobileKeyboardViewOpen) {
          // accept any partial input done by user
          setPickerDate(pickerDate);
        }

        setMobileKeyboardViewOpen(!isMobileKeyboardViewOpen);
      },
      onDateChange: (
        newDate: TDateValue,
        currentVariant: WrapperVariant,
        isFinish: boolean | symbol = true
      ) => {
        setPickerDate(newDate);
        const isFinishing =
          typeof isFinish === 'boolean' ? isFinish : isFinish === FORCE_FINISH_PICKER;

        if (isFinishing) {
          const autoAcceptRequested = Boolean(autoOk) || isFinish === FORCE_FINISH_PICKER;
          if (currentVariant === 'mobile' && autoAcceptRequested) {
            acceptDate(newDate, true);
          }

          if (currentVariant !== 'mobile') {
            acceptDate(newDate, autoAcceptRequested);
          }
        }
      },
    }),
    [acceptDate, autoOk, isMobileKeyboardViewOpen, pickerDate]
  );

  const inputProps = useMemo(
    () => ({
      onChange,
      inputFormat,
      open: isOpen,
      rawValue: value,
      openPicker: () => !readOnly && !disabled && setIsOpen(true),
    }),
    [onChange, inputFormat, isOpen, value, readOnly, disabled, setIsOpen]
  );

  const pickerState = { pickerProps, inputProps, wrapperProps };
  useDebugValue(pickerState, () => ({
    MuiPickerState: {
      pickerDate,
      parsedDate: date,
      other: pickerState,
    },
  }));

  return pickerState;
}
