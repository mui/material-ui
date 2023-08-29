import * as React from 'react';
import { expectType } from '@mui/types';
import Slider from '@mui/material/Slider';

function testOnChange() {
  function handleSliderChange(event: Event, value: unknown) {}
  function handleSliderChangeCommitted(event: React.SyntheticEvent | Event, value: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChangeCommitted} />;

  function handleElementChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;
}

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

function TestOnChangeValueType() {
  const [val] = React.useState(1);
  const [multipleVal] = React.useState([1, 2]);
  const handleMultipleChange = (event: Event, value: number[]) => {};
  const handleChange = (event: Event, value: number) => {};
  return (
    <React.Fragment>
      <Slider
        value={val}
        onChange={(event, value) => {
          expectType<number, typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number, typeof value>(value);
        }}
      />
      <Slider
        value={val}
        // @ts-expect-error mismatch in value type
        onChange={handleMultipleChange}
      />
      <Slider
        value={multipleVal}
        // @ts-expect-error mismatch in value type
        onChange={handleChange}
      />
      <Slider
        value={multipleVal}
        onChange={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
      />
      <Slider
        onChange={(event, value) => {
          expectType<number[] | number, typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number[] | number, typeof value>(value);
        }}
      />
      <Slider
        defaultValue={val}
        onChange={(event, value) => {
          expectType<number, typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number, typeof value>(value);
        }}
      />
      <Slider
        defaultValue={multipleVal}
        onChange={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
      />

      <Slider
        onChange={(event, value) => {
          expectType<number, typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number, typeof value>(value);
        }}
        value={val}
        component="a"
        onAbort={(e) => {
          expectType<React.SyntheticEvent<HTMLAnchorElement, Event>, typeof e>(e);
        }}
      />
      <Slider
        onChange={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number[], typeof value>(value);
        }}
        value={multipleVal}
        component="a"
        onAbort={(e) => {
          expectType<React.SyntheticEvent<HTMLAnchorElement, Event>, typeof e>(e);
        }}
      />
      <Slider
        onChange={(event, value) => {
          expectType<number[] | number, typeof value>(value);
        }}
        onChangeCommitted={(event, value) => {
          expectType<number[] | number, typeof value>(value);
        }}
        component="a"
        onAbort={(e) => {
          expectType<React.SyntheticEvent<HTMLAnchorElement, Event>, typeof e>(e);
        }}
      />
      <Slider component={CustomComponent} stringProp="" numberProp={1} />
      {/* @ts-expect-error as required props are missing */}
      <Slider component={CustomComponent} />
    </React.Fragment>
  );
}

<Slider track="inverted" />;

// slotProps and componentsProps as objects
<Slider
  slotProps={{
    root: { onMouseDown: () => 'onMouseDown event triggered' },
    input: { disabled: true },
    mark: { onClick: () => 'clicked' },
    markLabel: { className: 'markLabel' },
    rail: { className: 'rail' },
    thumb: { className: 'thumb' },
    valueLabel: { valueLabelDisplay: 'auto' },
  }}
  componentsProps={{
    root: { onMouseDown: () => 'onMouseDown event triggered' },
    input: { disabled: true },
    mark: { onClick: () => 'clicked' },
    markLabel: { className: 'markLabel' },
    rail: { className: 'rail' },
    thumb: { className: 'thumb' },
    valueLabel: { valueLabelDisplay: 'auto' },
  }}
/>;

// slotProps and componentsProps as functions
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
  componentsProps={{
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
