import * as React from 'react';
import SliderUnstyled, {
  SliderUnstyledInputSlotProps,
  SliderUnstyledMarkLabelSlotProps,
  SliderUnstyledMarkSlotProps,
  SliderUnstyledRailSlotProps,
  SliderUnstyledRootSlotProps,
  SliderUnstyledThumbSlotProps,
  SliderUnstyledTrackSlotProps,
  SliderUnstyledValueLabelSlotProps,
} from '@mui/base/SliderUnstyled';

const Root = React.forwardRef(function Root(
  props: SliderUnstyledRootSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: SliderUnstyledTrackSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Rail = React.forwardRef(function Rail(
  props: SliderUnstyledRailSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: SliderUnstyledThumbSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Mark = React.forwardRef(function Mark(
  props: SliderUnstyledMarkSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const MarkLabel = React.forwardRef(function MarkLabel(
  props: SliderUnstyledMarkLabelSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const ValueLabel = React.forwardRef(function ValueLabel(
  props: SliderUnstyledValueLabelSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { index, open, valueLabel, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: SliderUnstyledInputSlotProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { 'data-index': index, step, ownerState, ...other } = props;
  return <input data-track={ownerState.track} {...other} ref={ref} />;
});

const styledSlider = <SliderUnstyled components={{ Root, Track, Rail, Thumb, Mark, MarkLabel }} />;
