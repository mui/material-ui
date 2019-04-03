import { IUtils } from '@date-io/core/IUtils';
import { useCallback, useDebugValue, useEffect, useRef, useState } from 'react';
import { MaterialUiPickersDate } from '../..';
import { getDisplayDate } from '../../_helpers/text-field-helper';
import { BasePickerProps } from '../../typings/BasePicker';
import { useUtils } from './useUtils';

export interface HookOptions {
  getDefaultFormat: () => string;
  getValidationError: () => React.ReactNode;
}

const valueToDate = (utils: IUtils<any>, { value, initialFocusedDate }: BasePickerProps) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

function useDateValues(props: BasePickerProps, options: HookOptions) {
  const utils = useUtils();
  const date = valueToDate(utils, props);
  const acceptedDateRef = useRef(props.value);
  const format = props.format || options.getDefaultFormat();

  return { acceptedDateRef, date, format };
}

export function usePickerState(props: BasePickerProps, options: HookOptions) {
  const utils = useUtils();
  const [isOpen, setIsOpenState] = useState(false);
  const { acceptedDateRef, date, format } = useDateValues(props, options);

  useEffect(() => {
    if (!isOpen) {
      // if value was changed in closed state treat it as accepted
      acceptedDateRef.current = props.value;
    }
  }, [props.value]);

  const setIsOpen = useCallback(
    (newIsOpen: boolean) => {
      setIsOpenState(newIsOpen);
      if (newIsOpen && props.onOpen) {
        props.onOpen();
      }

      if (!newIsOpen && props.onClose) {
        props.onClose();
      }
    },
    [props.onOpen, props.onClose, setIsOpenState]
  );

  const validationError = options.getValidationError();
  if (validationError && props.onError) {
    props.onError(validationError, props.value);
  }

  const inputProps = {
    validationError,
    onClick: () => setIsOpen(true),
    inputValue: getDisplayDate(date, format, utils, props.value === null, props),
  };

  // prettier-ignore
  const acceptDate = useCallback((acceptedDate: MaterialUiPickersDate) => {
    acceptedDateRef.current = acceptedDate;

    setIsOpen(false);
    props.onChange(acceptedDate);

    if (props.onAccept) {
      props.onAccept(acceptedDate);
    }
  }, [utils, props.onChange]);

  const wrapperProps = {
    format,
    open: isOpen,
    onAccept: () => acceptDate(date),
    onClear: () => acceptDate(null),
    onSetToday: useCallback(() => props.onChange(utils.date()), [date, utils, props.onChange]),
    onDismiss: useCallback(() => {
      setIsOpen(false);
      props.onChange(acceptedDateRef.current);
    }, [date, utils, props.onChange]),
  };

  const pickerProps = {
    date,
    onChange: useCallback(
      (newDate: MaterialUiPickersDate, isFinish = true) => {
        props.onChange(newDate);

        if (isFinish && props.autoOk) {
          acceptDate(newDate);
        }
      },
      [props.onChange, props.autoOk]
    ),
  };

  const pickerState = { pickerProps, inputProps, wrapperProps };

  useDebugValue(pickerState);
  return pickerState;
}
