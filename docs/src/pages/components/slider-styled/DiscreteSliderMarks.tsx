import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/SliderStyled';

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  return (
    <Box width={300}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Custom marks
      </Typography>
      <Slider
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
