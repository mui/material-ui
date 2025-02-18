import * as React from 'react';
import { expectType } from '@mui/types';
import {
  Slider,
  SliderInputSlotProps,
  SliderMarkLabelSlotProps,
  SliderMarkSlotProps,
  SliderRailSlotProps,
  SliderRootSlotProps,
  SliderThumbSlotProps,
  SliderTrackSlotProps,
  SliderValueLabelSlotProps,
} from '@mui/base/Slider';

const Root = React.forwardRef(function Root(
  props: SliderRootSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Track = React.forwardRef(function Track(
  props: SliderTrackSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Rail = React.forwardRef(function Rail(
  props: SliderRailSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Thumb = React.forwardRef(function Thumb(
  props: SliderThumbSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Mark = React.forwardRef(function Mark(
  props: SliderMarkSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const MarkLabel = React.forwardRef(function MarkLabel(
  props: SliderMarkLabelSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { 'data-index': index, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const ValueLabel = React.forwardRef(function ValueLabel(
  props: SliderValueLabelSlotProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { index, open, valueLabel, ownerState, ...other } = props;
  return <div data-track={ownerState.track} {...other} ref={ref} />;
});

const Input = React.forwardRef(function Input(
  props: SliderInputSlotProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { 'data-index': index, step, ownerState, ...other } = props;
  return <input data-track={ownerState.track} {...other} ref={ref} />;
});

const styledSlider = (
  <Slider
    slots={{ root: Root, track: Track, rail: Rail, thumb: Thumb, mark: Mark, markLabel: MarkLabel }}
  />
);

const polymorphicComponentTest = () => {
  const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
    function CustomComponent() {
      return <div />;
    };

  return (
    <div>
      {/* @ts-expect-error */}
      <Slider invalidProp={0} />

      <Slider<'a'>
        slots={{
          root: 'a',
        }}
        href="#"
      />

      <Slider<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
        stringProp="test"
        numberProp={0}
      />
      {/* @ts-expect-error */}
      <Slider<typeof CustomComponent>
        slots={{
          root: CustomComponent,
        }}
      />

      <Slider<'button'>
        slots={{
          root: 'button',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.checkValidity()}
      />

      <Slider<'button'>
        slots={{
          root: 'button',
        }}
        ref={(elem) => {
          expectType<HTMLButtonElement | null, typeof elem>(elem);
        }}
        onMouseDown={(e) => {
          expectType<React.MouseEvent<HTMLButtonElement, MouseEvent>, typeof e>(e);
          e.currentTarget.checkValidity();
        }}
      />
    </div>
  );
};
