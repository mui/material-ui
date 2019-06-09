import { useMemo } from 'react';
import { useUtils } from './useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../..';
import { useOpenState } from './useOpenState';
import { BasePickerProps } from '../../typings/BasePicker';
import { useCallback, useDebugValue, useEffect, useState } from 'react';
import { getDisplayDate, validate } from '../../_helpers/text-field-helper';

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
      props.onChange(acceptedDate);

      if (props.onAccept) {
        props.onAccept(acceptedDate);
      }
    },
    [setIsOpen, props]
  );

  const wrapperProps = useMemo(
    () => ({
      format,
      open: isOpen,
      onAccept: () => acceptDate(pickerDate),
      onClear: () => acceptDate(null),
      onSetToday: () => props.onChange(utils.date()),
      onDismiss: () => {
        setIsOpen(false);
      },
    }),
    [acceptDate, format, isOpen, pickerDate, props, setIsOpen, utils]
  );

  const pickerProps = useMemo(
    () => ({
      date: pickerDate,
      onChange: (newDate: MaterialUiPickersDate, isFinish = true) => {
        setPickerDate(newDate);

        if (props.variant === 'inline') {
          props.onChange(newDate);
        }

        if (isFinish && props.autoOk) {
          acceptDate(newDate);
        }
      },
    }),
    [acceptDate, pickerDate, props]
  );

  const validationError = validate(props.value, utils, props);
  useEffect(() => {
    if (validationError && props.onError) {
      props.onError(validationError, props.value);
    }
  }, [props, validationError]);

  const inputProps = useMemo(
    () => ({
      validationError,
      onClick: () => !props.disabled && setIsOpen(true),
      inputValue: getDisplayDate(date, format, utils, props.value === null, props),
    }),
    [date, format, props, setIsOpen, utils, validationError]
  );

  const pickerState = { pickerProps, inputProps, wrapperProps };

  useDebugValue(pickerState);
  return pickerState;
}
