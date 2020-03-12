import { useOpenState } from './useOpenState';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { useUtils, useNow, MuiPickersAdapter } from './useUtils';
import { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';

export const FORCE_FINISH_PICKER = Symbol('Force closing picker, used for accessibility ');

export function usePickerState<TInput, TOutput>(
  props: BasePickerProps<TInput, TOutput>,
  parseInputValue: (
    now: MaterialUiPickersDate,
    utils: MuiPickersAdapter,
    props: BasePickerProps<TInput, TOutput>
  ) => TOutput | null,
  validateInputValue: (
    value: TInput,
    utils: MuiPickersAdapter,
    props: BasePickerProps<TInput, TOutput>
  ) => React.ReactNode | undefined
) {
  const { autoOk, inputFormat, disabled, readOnly, onAccept, onChange, onError, value } = props;

  if (!inputFormat) {
    throw new Error('inputFormat prop is required');
  }

  const now = useNow();
  const utils = useUtils();
  const date = parseInputValue(now, utils, props);
  const [pickerDate, setPickerDate] = useState(date);

  // Mobile keyboard view is a special case.
  // When it's open picker should work like closed, cause we are just showing text field
  const [isMobileKeyboardViewOpen, setMobileKeyboardViewOpen] = useState(false);
  const { isOpen, setIsOpen } = useOpenState(props);

  useEffect(() => {
    // if value was changed in closed state or from mobile keyboard view - treat it as accepted
    if ((!isOpen || isMobileKeyboardViewOpen) && !utils.isEqual(pickerDate, date)) {
      setPickerDate(date);
    }
  }, [date, isMobileKeyboardViewOpen, isOpen, pickerDate, utils]);

  const acceptDate = useCallback(
    (acceptedDate: TOutput | null, needClosePicker: boolean) => {
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
      format: inputFormat,
      onClear: () => acceptDate(null, true),
      onAccept: () => acceptDate(pickerDate, true),
      onDismiss: () => setIsOpen(false),
      onSetToday: () => {
        // TODO FIX ME
        setPickerDate(now as any);
        acceptDate(now as any, Boolean(autoOk));
      },
    }),
    [acceptDate, autoOk, inputFormat, isOpen, now, pickerDate, setIsOpen]
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
        newDate: TOutput,
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

  const validationError = validateInputValue(value, utils, props);
  useEffect(() => {
    if (onError) {
      onError(validationError, value);
    }
  }, [onError, validationError, value]);

  const inputProps = useMemo(
    () => ({
      onChange,
      inputFormat,
      rawValue: value,
      validationError,
      openPicker: () => !readOnly && !disabled && setIsOpen(true),
    }),
    [disabled, inputFormat, onChange, readOnly, setIsOpen, validationError, value]
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
