import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { createDelegatedEventHandler } from '../../_helpers/utils';
import { DateInputProps, MuiTextFieldProps } from '../PureDateInput';
import {
  maskedDateFormatter,
  getDisplayDate,
  checkMaskIsValidForCurrentFormat,
} from '../../_helpers/text-field-helper';

type MaskedInputProps = Omit<
  DateInputProps,
  | 'open'
  | 'adornmentPosition'
  | 'renderInput'
  | 'openPicker'
  | 'InputProps'
  | 'InputAdornmentProps'
  | 'openPickerIcon'
  | 'disableOpenPicker'
  | 'getOpenDialogAriaText'
  | 'OpenPickerButtonProps'
>;

export function useMaskedInput({
  disableMaskedInput,
  rawValue,
  validationError,
  onChange,
  mask,
  acceptRegex = /[\d]/gi,
  inputFormat,
  disabled,
  rifmFormatter,
  ignoreInvalidInputs,
  readOnly,
  TextFieldProps,
  label,
}: MaskedInputProps): MuiTextFieldProps {
  const utils = useUtils();
  const isFocusedRef = React.useRef(false);

  const getInputValue = React.useCallback(() => getDisplayDate(utils, rawValue, inputFormat), [
    inputFormat,
    rawValue,
    utils,
  ]);

  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState<string>(getInputValue());

  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);

  const formatter = React.useMemo(
    () =>
      shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : (st: string) => st,
    [acceptRegex, mask, shouldUseMaskedInput]
  );

  React.useEffect(() => {
    // We do not need to update the input value on keystroke
    // Because library formatters can change inputs from 12/12/2 to 12/12/0002
    if ((rawValue === null || utils.isValid(rawValue)) && !isFocusedRef.current) {
      setInnerInputValue(getInputValue());
    }
  }, [utils, getInputValue, rawValue]);

  const handleChange = (text: string) => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);

    const date = finalString === null ? null : utils.parse(finalString, inputFormat);
    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const rifmProps = useRifm({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter,
  });

  const inputStateArgs = shouldUseMaskedInput
    ? rifmProps
    : {
        value: innerInputValue,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.currentTarget.value),
      };

  return {
    ...inputStateArgs,
    label,
    disabled,
    placeholder: formatHelperText,
    error: validationError,
    helperText: formatHelperText,
    // @ts-ignore ??? fix typings for textfield finally
    'data-mui-test': 'keyboard-date-input',
    inputProps: { readOnly, type: shouldUseMaskedInput ? 'tel' : 'text' },
    ...TextFieldProps,
    onFocus: createDelegatedEventHandler(
      () => (isFocusedRef.current = true),
      TextFieldProps?.onFocus
    ),
    onBlur: createDelegatedEventHandler(
      () => (isFocusedRef.current = false),
      TextFieldProps?.onBlur
    ),
  };
}
