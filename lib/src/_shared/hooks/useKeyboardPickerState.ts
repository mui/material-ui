import { useUtils } from './useUtils';
import { Omit } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { IUtils } from '@date-io/core/IUtils';
import { DateType } from '../../constants/prop-types';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { HookOptions, usePickerState } from './usePickerState';
import { getDisplayDate } from '../../_helpers/text-field-helper';

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

export function useKeyboardPickerState(props: BaseKeyboardPickerProps, options: HookOptions) {
  const utils = useUtils();
  const format = props.format || options.getDefaultFormat();

  const [innerInputValue, setInnerInputValue] = useState(
    getDisplayDate(props.value, format, utils, props.value === null, props)
  );

  const dateValue = props.inputValue
    ? parseInputString(props.inputValue, utils, format)
    : props.value;

  useEffect(() => {
    if (props.value === null || utils.isValid(props.value)) {
      setInnerInputValue(getDisplayDate(props.value, format, utils, props.value === null, props));
    }
  }, [format, props, props.value, utils]);

  function handleChange(date: MaterialUiPickersDate) {
    const dateString = utils.format(date, format);
    props.onChange(date, dateString);
  }

  const { inputProps: innerInputProps, wrapperProps, pickerProps } = usePickerState(
    // Extend props interface
    { ...props, value: dateValue, onChange: handleChange },
    options
  );

  const inputProps = {
    ...innerInputProps,
    format: wrapperProps.format,
    inputValue: props.inputValue || innerInputValue,
    onChange: (value: string) => {
      setInnerInputValue(value);
      const date = value === '' ? null : utils.parse(value, wrapperProps.format);

      props.onChange(date, value);
    },
  };

  return {
    inputProps,
    wrapperProps,
    pickerProps,
  };
}
