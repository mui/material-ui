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

function valueText(value: number) {
  return `${value}°C`;
}

export default function TrackInvertedSlider() {
  return (
    <Box sx={{ width: 250 }}>
      <Typography id="track-inverted-slider" gutterBottom>
        Inverted track
      </Typography>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-slider"
        getAriaValueText={valueText}
        defaultValue={30}
        marks={marks}
      />
      <Separator />
      <Typography id="track-inverted-range-slider" gutterBottom>
        Inverted track range
      </Typography>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valueText}
        defaultValue={[20, 37]}
        marks={marks}
      />
    </Box>
  );
}
