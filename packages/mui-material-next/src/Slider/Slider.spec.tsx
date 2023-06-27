import * as React from 'react';
import Slider from '@mui/material-next/Slider';
import { SliderOwnerState } from './Slider.types';

function testOnChange() {
  function handleSliderChange(event: Event, value: unknown) {}
  function handleSliderChangeCommitted(event: React.SyntheticEvent | Event, value: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChangeCommitted} />;

  function handleElementChange(event: React.ChangeEvent) {}
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;
}

<Slider track="inverted" />;

// slotProps as object
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
/>;

// slotProps as function
<Slider
  slotProps={{
    root: ({ color }: SliderOwnerState) => ({
      className: color === 'primary' ? 'root_primary' : 'root_secondary',
    }),
    input: ({ size }: SliderOwnerState) => ({ disabled: size === 'medium' }),
    mark: ({ marked }: SliderOwnerState) => ({
      className: marked ? 'marked' : '',
    }),
    markLabel: ({ max }: SliderOwnerState) => ({
      className: max === 99 ? 'red' : 'normal',
    }),
    rail: ({ dragging }: SliderOwnerState) => ({
      className: dragging ? 'rail' : '',
    }),
    thumb: ({ orientation }: SliderOwnerState) => ({
      className: orientation === 'vertical' ? 'thumb_vertical' : '',
    }),
  }}
/>;
