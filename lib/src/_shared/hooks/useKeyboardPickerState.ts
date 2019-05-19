import { useUtils } from './useUtils';
import { Omit } from '@material-ui/core';
import { IUtils } from '@date-io/core/IUtils';
import { useEffect, useMemo, useState } from 'react';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { getDisplayDate } from '../../_helpers/text-field-helper';
import { StateHookOptions, usePickerState } from './usePickerState';

export interface BaseKeyboardPickerProps extends Omit<BasePickerProps, 'onChange'> {
  /** String value for controlling value with pure input string. Overrides value prop */
  inputValue?: string;
  /** Keyboard onChange callback */
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
}

function parseInputString(value: string, utils: IUtils<any>, format: string) {
  try {
    return utils.parse(value, format);
  } catch {
    return null;
  }
}

export function useKeyboardPickerState(props: BaseKeyboardPickerProps, options: StateHookOptions) {
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
    const dateString = date === null ? null : utils.format(date, format);

    props.onChange(date, dateString);
  }

  const { inputProps: innerInputProps, wrapperProps, pickerProps } = usePickerState(
    // Extend props interface
    { ...props, value: dateValue, onChange: handleChange },
    options
  );

  const inputProps = useMemo(
    () => ({
      ...innerInputProps,
      format: wrapperProps.format,
      inputValue: props.inputValue || innerInputValue,
      onChange: (value: string) => {
        setInnerInputValue(value);
        const date = value === '' ? null : utils.parse(value, wrapperProps.format);

        props.onChange(date, value);
      },
    }),
    [innerInputProps, innerInputValue, props, utils, wrapperProps.format]
  );

  return {
    inputProps,
    wrapperProps,
    pickerProps,
  };
}
