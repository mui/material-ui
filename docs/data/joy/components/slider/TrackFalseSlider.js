import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Slider from '@mui/joy/Slider';

const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

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

function valueText(value) {
  return `${value}°C`;
}

export default function TrackFalseSlider() {
  return (
    <Box sx={{ width: 250 }}>
      <Typography id="track-false-slider" gutterBottom>
        Removed track
      </Typography>
      <Slider
        track={false}
        aria-labelledby="track-false-slider"
        getAriaValueText={valueText}
        defaultValue={37}
        marks={marks}
      />
      <Separator />
      <Typography id="track-false-range-slider" gutterBottom>
        Removed track range slider
      </Typography>
      <Slider
        track={false}
        aria-labelledby="track-false-range-slider"
        getAriaValueText={valueText}
        defaultValue={[20, 37, 100]}
        marks={marks}
      />
    </Box>
  );
}
