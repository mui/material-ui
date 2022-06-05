import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import * as React from 'react';

function valueText(value) {
  return `${value}°C`;
}

export default function SliderColors() {
  return (
    <Box
      sx={{
        width: 300,
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Slider
        color="primary"
        aria-labelledby="color-primary-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        color="neutral"
        aria-labelledby="color-neutral-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        color="danger"
        aria-labelledby="color-danger-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        color="info"
        aria-labelledby="color-info-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        color="success"
        aria-labelledby="color-success-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        color="warning"
        aria-labelledby="color-warning-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
    </Box>
  );
}
