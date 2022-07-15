import * as React from 'react';
import InputUnstyled, {
  InputUnstyledInputSlotProps,
  InputUnstyledRootSlotProps,
} from '@mui/base/InputUnstyled';

const InputRoot = React.forwardRef(function InputRoot(
  props: InputUnstyledRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-focused={ownerState.focused} {...other} ref={ref} />;
});

const InputInput = React.forwardRef(function InputInput(
  props: InputUnstyledInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-focused={ownerState.focused} {...other} ref={ref} />;
});

const styledInput = <InputUnstyled components={{ Root: InputRoot, Input: InputInput }} />;
