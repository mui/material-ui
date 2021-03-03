import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForkRef } from '@material-ui/core/utils';
import { useUtils } from './hooks/useUtils';
import CalendarIcon from '../svg-icons/Calendar';
import { useMaskedInput } from './hooks/useMaskedInput';
import { DateInputProps, DateInputRefs } from './PureDateInput';
import { getTextFieldAriaText } from './text-field-helper';

export const KeyboardDateInput = React.forwardRef(function KeyboardDateInput(
  props: DateInputProps & DateInputRefs,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    containerRef,
    disableOpenPicker,
    getOpenDialogAriaText = getTextFieldAriaText,
    InputAdornmentProps,
    InputProps,
    inputRef = null,
    openPicker,
    OpenPickerButtonProps,
    openPickerIcon = <CalendarIcon />,
    renderInput,
    ...other
  } = props;
  const utils = useUtils();
  const inputRefHandle = useForkRef(inputRef, ref);
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = InputAdornmentProps?.position || 'end';

  return renderInput({
    ref: containerRef,
    inputRef: inputRefHandle,
    ...textFieldProps,
    InputProps: {
      ...InputProps,
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : (
        <InputAdornment position={adornmentPosition} {...InputAdornmentProps}>
          <IconButton
            edge={adornmentPosition}
            data-mui-test="open-picker-from-keyboard"
            disabled={other.disabled}
            aria-label={getOpenDialogAriaText(other.rawValue, utils)}
            {...OpenPickerButtonProps}
            onClick={openPicker}
          >
            {openPickerIcon}
          </IconButton>
        </InputAdornment>
      ),
    },
  });
});

KeyboardDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  openPickerIcon: PropTypes.node,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func,
};

export default KeyboardDateInput;
