import * as React from 'react';
import Slider from '@mui/material/Slider';

function testOnChange() {
  function handleSliderChange(event: Event, value: unknown) {}
  function handleSliderChangeCommitted(event: React.SyntheticEvent | Event, value: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChangeCommitted} />;

  function handleElementChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;
}

<Slider track="inverted" />;

// color types
<Slider color="primary" />;
<Slider color="secondary" />;
<Slider color="error" />;
<Slider color="success" />;
<Slider color="info" />;
<Slider color="warning" />;

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

// value, onChange, and onChangeCommitted value type
<Slider
  value={5}
  onChange={(event, value: number) => {}}
  onChangeCommitted={(event, value: number) => {}}
/>;
<Slider
  value={[5, 10]}
  onChange={(event, value: number[]) => {}}
  onChangeCommitted={(event, value: number[]) => {}}
/>;

const CustomComponent: React.FC<{ stringProp: string; numberProp: number }> =
  function CustomComponent() {
    return <div />;
  };

<Slider component="div" />;
<Slider component={CustomComponent} stringProp="a" numberProp={1} />;
/* @ts-expect-error missing stringProp and numberProp */
<Slider component={CustomComponent} />;
/* @ts-expect-error does not allow any prop */
<Slider abc="123" />;
