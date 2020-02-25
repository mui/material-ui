import { useUtils, useNow } from './useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { useOpenState } from './useOpenState';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { MaterialUiPickersDate } from '../../typings/date';
import { BasePickerProps } from '../../typings/BasePicker';
import { validate } from '../../_helpers/text-field-helper';
import { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';

const useValueToDate = (
  utils: IUtils<MaterialUiPickersDate>,
  { value, defaultHighlight }: BasePickerProps
) => {
  const now = useNow();
  const date = utils.date(value || defaultHighlight || now);

  return date && utils.isValid(date) ? date : now;
};

function useDateValues(props: BasePickerProps) {
  const utils = useUtils();
  const date = useValueToDate(utils, props);
  const inputFormat = props.inputFormat;

  if (!inputFormat) {
    throw new Error('format prop is required');
  }

  return { date, inputFormat };
}

export const FORCE_FINISH_PICKER = Symbol('Force closing picker, used for accessibility ');

export function usePickerState(props: BasePickerProps) {
  const { autoOk, disabled, readOnly, onAccept, onChange, onError, value } = props;

  const utils = useUtils();
  const { date, inputFormat } = useDateValues(props);
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
    (acceptedDate: MaterialUiPickersDate, needClosePicker: boolean) => {
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
      format: inputFormat,
      open: isOpen,
      onClear: () => acceptDate(null, true),
      onAccept: () => acceptDate(pickerDate, true),
      onSetToday: () => setPickerDate(utils.date()),
      onDismiss: () => setIsOpen(false),
    }),
    [acceptDate, inputFormat, isOpen, pickerDate, setIsOpen, utils]
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
        newDate: MaterialUiPickersDate,
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

  const validationError = validate(value, utils, props as any);
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
