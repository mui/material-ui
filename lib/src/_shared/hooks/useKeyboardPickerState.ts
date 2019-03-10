import { IUtils } from '@date-io/core/IUtils';
import { Omit } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getDisplayDate2 } from '../../_helpers/text-field-helper';
import { DateType } from '../../constants/prop-types';
import { MaterialUiPickersDate } from '../../typings/date';
import { BasePickerProps } from '../BasePicker';
import { usePickerState } from './usePickerState';
import { useUtils } from './useUtils';

export interface BaseKeyboardPickerProps extends Omit<BasePickerProps, 'value' | 'onChange'> {
  value?: DateType;
  inputValue?: string;
  onChange: (date: MaterialUiPickersDate | null, value: string | undefined) => void;
}

function parseInputString(value: string, utils: IUtils<any>, format: string) {
  try {
    return utils.parse(value, format);
  } catch {
    return null;
  }
}

export function useKeyboardPickerState(
  props: BaseKeyboardPickerProps,
  getDefaultFormat: () => string
) {
  const utils = useUtils();
  const format = props.format || getDefaultFormat();
  const [innerInputValue, setInnerInputValue] = useState(
    getDisplayDate2(props.value, format, utils, props.value === null, props)
  );

  const dateValue = props.inputValue
    ? parseInputString(props.inputValue, utils, format)
    : props.value;

  useEffect(() => {
    if (!props.inputValue && utils.isValid(props.value)) {
      setInnerInputValue(getDisplayDate2(props.value, format, utils, props.value === null, props));
    }
  }, [props.value]);

  const { inputProps: innerInputProps, wrapperProps, pickerProps } = usePickerState(
    // Extend props interface
    { ...props, value: dateValue, onChange: handleChange },
    getDefaultFormat
  );

  const inputProps = {
    ...innerInputProps,
    inputValue: props.inputValue || innerInputValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const date = utils.parse(e.target.value, wrapperProps.format);
      setInnerInputValue(e.target.value);

      props.onChange(date, e.target.value);
    },
  };

  function handleChange(date: MaterialUiPickersDate) {
    const dateString = utils.format(date, wrapperProps.format);
    props.onChange(date, dateString);
  }

  return {
    inputProps,
    wrapperProps,
    pickerProps,
  };
}
