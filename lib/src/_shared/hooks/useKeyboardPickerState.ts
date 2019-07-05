import { useUtils } from './useUtils';
import { Omit } from '@material-ui/core';
import { IUtils } from '@date-io/core/IUtils';
import { BasePickerProps } from '../../typings/BasePicker';
import { MaterialUiPickersDate } from '../../typings/date';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { format = options.getDefaultFormat(), inputValue, onChange, value } = props;
  const utils = useUtils();

  const displayDate = getDisplayDate(value, format, utils, value === null, props);
  const [innerInputValue, setInnerInputValue] = useState(displayDate);
  const dateValue = inputValue ? parseInputString(inputValue, utils, format) : value;

  useEffect(() => {
    if (value === null || utils.isValid(value)) {
      setInnerInputValue(displayDate);
    }
  }, [displayDate, setInnerInputValue, utils, value]);

  const handleKeyboardChange = useCallback(
    (date: MaterialUiPickersDate) => {
      onChange(date, date === null ? null : utils.format(date, format));
    },
    [format, onChange, utils]
  );

  const { inputProps: innerInputProps, wrapperProps, pickerProps } = usePickerState(
    // Extend props interface
    { ...props, value: dateValue, onChange: handleKeyboardChange },
    options
  );

  const inputProps = useMemo(
    () => ({
      ...innerInputProps, // reuse validation and open/close logic
      format: wrapperProps.format,
      inputValue: inputValue || innerInputValue,
      onChange: (value: string | null) => {
        setInnerInputValue(value || '');
        const date = value === null ? null : utils.parse(value, wrapperProps.format);

        onChange(date, value);
      },
    }),
    [innerInputProps, innerInputValue, inputValue, onChange, utils, wrapperProps.format]
  );

  return {
    inputProps,
    wrapperProps,
    pickerProps,
  };
}
