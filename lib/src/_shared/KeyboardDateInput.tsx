import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useUtils } from './hooks/useUtils';
import { CalendarIcon } from './icons/CalendarIcon';
import { useMaskedInput } from './hooks/useMaskedInput';
import { DateInputProps, DateInputRefs } from './PureDateInput';
import { getTextFieldAriaText } from '../_helpers/text-field-helper';

export const KeyboardDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  renderInput,
  openPicker: onOpen,
  InputProps,
  InputAdornmentProps,
  openPickerIcon = <CalendarIcon />,
  OpenPickerButtonProps,
  disableOpenPicker: hideOpenPickerButton,
  getOpenDialogAriaText = getTextFieldAriaText,
  containerRef,
  forwardedRef,
  ...other
}) => {
  const utils = useUtils();
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = InputAdornmentProps?.position || 'end';

  return renderInput({
    ref: containerRef,
    inputRef: forwardedRef,
    ...textFieldProps,
    InputProps: {
      ...InputProps,
      [`${adornmentPosition}Adornment`]: hideOpenPickerButton ? (
        undefined
      ) : (
        <InputAdornment position={adornmentPosition} {...InputAdornmentProps}>
          <IconButton
            edge={adornmentPosition}
            data-mui-test="open-picker-from-keyboard"
            disabled={other.disabled}
            aria-label={getOpenDialogAriaText(other.rawValue, utils)}
            {...OpenPickerButtonProps}
            onClick={onOpen}
          >
            {openPickerIcon}
          </IconButton>
        </InputAdornment>
      ),
    },
  });
};

export default KeyboardDateInput;
