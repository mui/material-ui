import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/SliderStyled';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  return (
    <Box width={300}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Small steps
      </Typography>
      <Slider
        defaultValue={0.00000005}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
