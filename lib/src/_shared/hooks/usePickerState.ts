import { useMemo } from 'react';
import { useUtils } from './useUtils';
import { IUtils } from '@date-io/core/IUtils';
import { MaterialUiPickersDate } from '../..';
import { BasePickerProps } from '../../typings/BasePicker';
import { getDisplayDate } from '../../_helpers/text-field-helper';
import { useCallback, useDebugValue, useEffect, useRef, useState } from 'react';

export interface HookOptions {
  getDefaultFormat: () => string;
  getValidationError: () => React.ReactNode;
}

const valueToDate = (
  utils: IUtils<MaterialUiPickersDate>,
  { value, initialFocusedDate }: BasePickerProps
) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

function useDateValues(props: BasePickerProps, options: HookOptions) {
  const utils = useUtils();
  const date = valueToDate(utils, props);
  const acceptedDateRef = useRef(date);
  const format = props.format || options.getDefaultFormat();

  return { acceptedDateRef, date, format };
}

function makeControlledOpenProps(props: BasePickerProps) {
  return {
    isOpen: props.open!,
    setIsOpen: (newIsOpen: boolean) => {
      return newIsOpen ? props.onOpen && props.onOpen() : props.onClose && props.onClose();
    },
  };
}

/* eslint-disable react-hooks/rules-of-hooks */
function useOpenState(props: BasePickerProps) {
  if (props.open !== undefined && props.open !== null) {
    return makeControlledOpenProps(props);
  }

  const [isOpen, setIsOpenState] = useState(false);
  // prettier-ignore
  const setIsOpen = useCallback((newIsOpen: boolean) => {
    setIsOpenState(newIsOpen);

    return newIsOpen
      ? props.onOpen && props.onOpen()
      : props.onClose && props.onClose()
  }, [props]);

  return { isOpen, setIsOpen };
}
/* eslint-enable react-hooks/rules-of-hooks */

export function usePickerState(props: BasePickerProps, options: HookOptions) {
  const utils = useUtils();
  const { isOpen, setIsOpen } = useOpenState(props);
  const { acceptedDateRef, date, format } = useDateValues(props, options);

  useEffect(() => {
    if (!isOpen) {
      // if value was changed in closed state treat it as accepted
      acceptedDateRef.current = date;
    }
  }, [acceptedDateRef, date, isOpen, props.value]);

  const validationError = options.getValidationError();
  if (validationError && props.onError) {
    props.onError(validationError, props.value);
  }

  const inputProps = useMemo(
    () => ({
      validationError,
      onClick: () => setIsOpen(true),
      inputValue: getDisplayDate(date, format, utils, props.value === null, props),
    }),
    [date, format, props, setIsOpen, utils, validationError]
  );

  // prettier-ignore
  const acceptDate = useCallback((acceptedDate: MaterialUiPickersDate) => {
    acceptedDateRef.current = acceptedDate;

    setIsOpen(false);
    props.onChange(acceptedDate);

    if (props.onAccept) {
      props.onAccept(acceptedDate);
    }
  }, [acceptedDateRef, setIsOpen, props]);

  const wrapperProps = useMemo(
    () => ({
      format,
      open: isOpen,
      onAccept: () => acceptDate(date),
      onClear: () => acceptDate(null),
      onSetToday: () => props.onChange(utils.date()),
      onDismiss: () => {
        setIsOpen(false);
        props.onChange(acceptedDateRef.current);
      },
    }),
    [acceptDate, acceptedDateRef, date, format, isOpen, props, setIsOpen, utils]
  );

  const pickerProps = useMemo(
    () => ({
      date,
      onChange: (newDate: MaterialUiPickersDate, isFinish = true) => {
        props.onChange(newDate);

        if (isFinish && props.autoOk) {
          acceptDate(newDate);
        }
      },
    }),
    [acceptDate, date, props]
  );

  const pickerState = { pickerProps, inputProps, wrapperProps };

  useDebugValue(pickerState);
  return pickerState;
}
