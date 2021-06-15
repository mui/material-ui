import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

export default function VerticalSlider() {
  return (
    <Box sx={{ height: 300 }}>
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        getAriaValueText={valuetext}
        defaultValue={30}
      />
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        defaultValue={30}
        disabled
      />
      <Slider
        getAriaLabel={() => 'Temperature'}
        orientation="vertical"
        getAriaValueText={valuetext}
        defaultValue={[20, 37]}
        marks={marks}
      />
    </Box>
  );
}
