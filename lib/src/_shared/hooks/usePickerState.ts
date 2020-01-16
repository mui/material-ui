import { useUtils } from './useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { useOpenState } from './useOpenState';
import { WrapperVariant } from '../../wrappers/Wrapper';
import { MaterialUiPickersDate } from '../../typings/date';
import { BasePickerProps } from '../../typings/BasePicker';
import { validate } from '../../_helpers/text-field-helper';
import { useCallback, useDebugValue, useEffect, useMemo, useState, useRef } from 'react';

const useValueToDate = (
  utils: IUtils<MaterialUiPickersDate>,
  { value, initialFocusedDate }: BasePickerProps
) => {
  const nowRef = useRef(utils.date());
  const date = utils.date(value || initialFocusedDate || nowRef.current);

  return date && utils.isValid(date) ? date : nowRef.current;
};

function useDateValues(props: BasePickerProps) {
  const utils = useUtils();
  const date = useValueToDate(utils, props);
  const format = props.format;

  if (!format) {
    throw new Error('format prop is required');
  }

  return { date, format };
}

export function usePickerState(props: BasePickerProps) {
  const { autoOk, disabled, readOnly, onAccept, onChange, onError, value } = props;

  const utils = useUtils();
  const { date, format } = useDateValues(props);
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
    (acceptedDate: MaterialUiPickersDate) => {
      onChange(acceptedDate);
      if (onAccept) {
        onAccept(acceptedDate);
      }

      setIsOpen(false);
    },
    [onAccept, onChange, setIsOpen]
  );

  const wrapperProps = useMemo(
    () => ({
      format,
      open: isOpen,
      onClear: () => acceptDate(null),
      onAccept: () => acceptDate(pickerDate),
      onSetToday: () => setPickerDate(utils.date()),
      onDismiss: () => setIsOpen(false),
    }),
    [acceptDate, format, isOpen, pickerDate, setIsOpen, utils]
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
        isFinish = true
      ) => {
        setPickerDate(newDate);

        if (isFinish && autoOk) {
          acceptDate(newDate);
          return;
        }

        // simulate autoOk, but do not close the modal
        if (currentVariant === 'desktop' || currentVariant === 'static') {
          onChange(newDate);
          onAccept && onAccept(newDate);
        }
      },
    }),
    [acceptDate, autoOk, isMobileKeyboardViewOpen, onAccept, onChange, pickerDate]
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
      format,
      rawValue: value,
      validationError,
      openPicker: () => !readOnly && !disabled && setIsOpen(true),
    }),
    [disabled, format, onChange, readOnly, setIsOpen, validationError, value]
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
