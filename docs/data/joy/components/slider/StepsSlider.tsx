import * as React from 'react';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';

function valueText(value: number) {
  return `${value}°C`;
}

export default function StepsSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={valueText}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
