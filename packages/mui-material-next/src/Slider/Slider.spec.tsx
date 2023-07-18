import * as React from 'react';
import Slider from '@mui/material-next/Slider';
import { expectType } from '@mui/types';
import { SliderOwnerState } from './Slider.types';

function testOnChange() {
  function handleSliderChange(event: Event, value: unknown) {}
  function handleSliderChangeCommitted(event: React.SyntheticEvent | Event, value: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChangeCommitted} />;

  function handleElementChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;
}

<Slider track="inverted" />;

<Slider component="div" />;

<Slider data-testid="any" />;

// common HTML attributes
<Slider onDrop={() => {}} />;

<Slider defaultValue={30} />;

<Slider color="primary" />;
<Slider color="secondary" />;

<Slider size="small" />;
<Slider size="medium" />;

<Slider
  slots={{
    root: 'div',
    mark: 'div',
    markLabel: 'div',
    rail: 'div',
    track: 'div',
    thumb: 'div',
    valueLabel: 'div',
    input: 'div',
  }}
/>;

// slotProps as objects
<Slider
  slotProps={{
    root: {
      onMouseDown: () => 'onMouseDown event triggered',
    },
    input: { disabled: true },
    mark: { onClick: () => 'clicked' },
    markLabel: { className: 'markLabel' },
    rail: { className: 'rail' },
    thumb: { className: 'thumb' },
    valueLabel: { className: 'valueLabel' },
  }}
/>;

// incorrect slotProps
<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    root: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    input: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    mark: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    markLabel: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    rail: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    thumb: { incorrectProp: true },
  }}
/>;

<Slider
  slotProps={{
    // @ts-expect-error incorrect prop
    valueLabel: { incorrectProp: true },
  }}
/>;

// slotProps as functions
<Slider
  slotProps={{
    root: ({ color }) => ({ className: color === 'primary' ? 'root_primary' : 'root_secondary' }),
    input: ({ size }) => ({ disabled: size === 'medium' }),
    mark: ({ marked }) => ({
      className: marked ? 'marked' : '',
    }),
    markLabel: ({ max }) => ({ className: max === 99 ? 'red' : 'normal' }),
    rail: ({ dragging }) => ({
      className: dragging ? 'rail' : '',
    }),
    thumb: ({ orientation }) => ({ className: orientation === 'vertical' ? 'thumb_vertical' : '' }),
  }}
/>;

<Slider
  slotProps={{
    root: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    mark: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    markLabel: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    rail: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    track: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    thumb: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    valueLabel: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
    input: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {};
    },
  }}
/>;
