import * as React from 'react';
import * as PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForkRef } from '@material-ui/core/utils';
import { useUtils } from './hooks/useUtils';
import { CalendarIcon } from './icons/CalendarIcon';
import { useMaskedInput } from './hooks/useMaskedInput';
import { DateInputProps, DateInputRefs } from './PureDateInput';
import { getTextFieldAriaText } from '../_helpers/text-field-helper';

export const KeyboardDateInput: React.FC<DateInputProps & DateInputRefs> = ({
  containerRef,
  inputRef = null,
  forwardedRef = null,
  disableOpenPicker: hideOpenPickerButton,
  getOpenDialogAriaText = getTextFieldAriaText,
  InputAdornmentProps,
  InputProps,
  openPicker: onOpen,
  OpenPickerButtonProps,
  openPickerIcon = <CalendarIcon />,
  renderInput,
  ...other
}) => {
  const utils = useUtils();
  const inputRefHandle = useForkRef(inputRef, forwardedRef);
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = InputAdornmentProps?.position || 'end';

  return renderInput({
    ref: containerRef,
    inputRef: inputRefHandle,
    ...textFieldProps,
    InputProps: {
      ...InputProps,
      [`${adornmentPosition}Adornment`]: hideOpenPickerButton ? undefined : (
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

KeyboardDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func,
};
