import { IUtils } from '@date-io/core/IUtils';
import { useCallback, useState } from 'react';
import { MaterialUiPickersDate } from '../..';
import { BasePickerProps } from '../BasePicker';
import { useUtils } from './useUtils';

const getInitialDate = (utils: IUtils<any>, { value, initialFocusedDate }: BasePickerProps) => {
  const initialDate = value || initialFocusedDate || utils.date();
  const date = utils.date(initialDate);

  return date && utils.isValid(date) ? date : utils.date();
};

export function usePickerState(props: BasePickerProps) {
  const utils = useUtils();
  const initialDate = getInitialDate(utils, props);
  const [date, setDate] = useState(initialDate);

  const wrapperProps = {
    onClear: useCallback(() => props.onChange(null), []),
    onAccept: useCallback(() => props.onChange(date), []),
    onSetToday: useCallback(() => props.onChange(utils.date()), []),
    handleDismiss: useCallback(() => props.onChange(initialDate), []),
  };

  const pickerProps = {
    date,
    onChange: useCallback((newDate: MaterialUiPickersDate, callback?: any) => {
      setDate(newDate);
      callback();
    }, []),
  };

  return { pickerProps, wrapperProps };
  // return { }
}
