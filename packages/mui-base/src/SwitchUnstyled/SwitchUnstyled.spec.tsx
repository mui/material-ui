import * as React from 'react';
import SwitchUnstyled, {
  SwitchUnstyledRootSlotProps,
  SwitchUnstyledThumbSlotProps,
  SwitchUnstyledTrackSlotProps,
  SwitchUnstyledInputSlotProps,
} from '@mui/base/SwitchUnstyled';

const Root = React.forwardRef(function Root(
  props: SwitchUnstyledRootSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: SwitchUnstyledInputSlotProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const { ownerState, ...other } = props;
  return <input data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: SwitchUnstyledThumbSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: SwitchUnstyledTrackSlotProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-checked={ownerState.checked} {...other} ref={ref} />;
});

const styledSwitch = <SwitchUnstyled components={{ Root, Thumb, Track, Input }} />;
