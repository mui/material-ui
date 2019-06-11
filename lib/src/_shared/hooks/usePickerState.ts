import { useUtils } from './useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../..';
import { useOpenState } from './useOpenState';
import { BasePickerProps } from '../../typings/BasePicker';
import { getDisplayDate, validate } from '../../_helpers/text-field-helper';
import { useCallback, useDebugValue, useEffect, useMemo, useState } from 'react';

export interface StateHookOptions {
  getDefaultFormat: () => string;
}

const valueToDate = (
  utils: IUtils<MaterialUiPickersDate>,
  { value, initialFocusedDate }: BasePickerProps
) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

function useDateValues(props: BasePickerProps, options: StateHookOptions) {
  const utils = useUtils();
  const date = valueToDate(utils, props);
  const format = props.format || options.getDefaultFormat();

  return { date, format };
}

export function usePickerState(props: BasePickerProps, options: StateHookOptions) {
  const { autoOk, disabled, onAccept, onChange, onError, value, variant } = props;

  const utils = useUtils();
  const { isOpen, setIsOpen } = useOpenState(props);
  const { date, format } = useDateValues(props, options);
  const [pickerDate, setPickerDate] = useState(date);

  useEffect(() => {
    // if value was changed in closed state - treat it as accepted
    if (!isOpen && !utils.isEqual(pickerDate, date)) {
      setPickerDate(date);
    }
  }, [date, isOpen, pickerDate, utils]);

  const acceptDate = useCallback(
    (acceptedDate: MaterialUiPickersDate) => {
      setIsOpen(false);
      onChange(acceptedDate);

      if (onAccept) {
        onAccept(acceptedDate)
      }
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
      onDismiss: () => {
        setIsOpen(false);
      },
    }),
    [acceptDate, format, isOpen, pickerDate, setIsOpen, utils]
  );

  const pickerProps = useMemo(
    () => ({
      date: pickerDate,
      onChange: (newDate: MaterialUiPickersDate, isFinish = true) => {
        setPickerDate(newDate);

        if (variant === 'inline') {
          onChange(newDate);
        }

        if (isFinish && autoOk) {
          acceptDate(newDate);
        }
      },
    }),
    [acceptDate, autoOk, onChange, pickerDate, variant]
  );

  const validationError = validate(value, utils, props);
  useEffect(() => {
    if (validationError && onError) {
      onError(validationError, value);
    }
  }, [onError, validationError, value]);

  const inputValue = getDisplayDate(date, format, utils, value === null, props);
  const inputProps = useMemo(
    () => ({
      inputValue,
      validationError,
      onClick: () => !disabled && setIsOpen(true),
    }),
    [disabled, inputValue, setIsOpen, validationError]
  );

  const pickerState = { pickerProps, inputProps, wrapperProps };

  useDebugValue(pickerState);
  return pickerState;
}
