import { IUtils } from '@date-io/core/IUtils';
import { useCallback, useRef, useState } from 'react';
import { MaterialUiPickersDate } from '../..';
import { getDisplayDate2 } from '../../_helpers/text-field-helper';
import { BasePickerProps } from '../BasePicker';
import { useUtils } from './useUtils';

const valueToDate = (utils: IUtils<any>, { value, initialFocusedDate }: BasePickerProps) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

export function usePickerState(props: BasePickerProps, getDefaultFormat: () => string) {
  const utils = useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const date = valueToDate(utils, props);
  const acceptedDateRef = useRef(props.value);
  const format = props.format || getDefaultFormat();

  const inputProps = {
    onClick: () => setIsOpen(true),
    inputValue: getDisplayDate2(date, format, utils, props),
  };

  const acceptDate = useCallback(
    (acceptedDate: MaterialUiPickersDate) => {
      acceptedDateRef.current = acceptedDate;

      setIsOpen(false);
      props.onChange(acceptedDate);
    },
    [utils, props.onChange]
  );

  // TODO change on useReducer
  const wrapperProps = {
    format,
    open: isOpen,
    onAccept: () => acceptDate(date),
    onClear: useCallback(() => props.onChange(null), [date, utils, props.onChange]),
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
