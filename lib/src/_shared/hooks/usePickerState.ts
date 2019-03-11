import { IUtils } from '@date-io/core/IUtils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MaterialUiPickersDate } from '../..';
import { getDisplayDate2 } from '../../_helpers/text-field-helper';
import { BasePickerProps } from '../BasePicker';
import { useUtils } from './useUtils';

export interface HookOptions {
  getDefaultFormat: () => string;
  getValidationError: (date: MaterialUiPickersDate) => React.ReactNode;
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
  const [isOpen, setIsOpen] = useState(false);
  const { acceptedDateRef, date, format } = useDateValues(props, options);

  useEffect(() => {
    if (!isOpen) {
      // if value was changed in closed state treat it as accepted
      acceptedDateRef.current = props.value;
    }
  }, [props.value]);

  const inputProps = {
    onClick: () => setIsOpen(true),
    validationError: options.getValidationError(date),
    inputValue: getDisplayDate2(date, format, utils, props.value === null, props),
  };

  const acceptDate = useCallback(
    (acceptedDate: MaterialUiPickersDate) => {
      acceptedDateRef.current = acceptedDate;

      setIsOpen(false);
      props.onChange(acceptedDate);

      if (props.onAccept) {
        props.onAccept(acceptedDate);
      }
    },
    [utils, props.onChange]
  );

  // TODO change on useReducer
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

  return { pickerProps, inputProps, wrapperProps };
}
