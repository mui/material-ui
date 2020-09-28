import React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import { Typography } from '@material-ui/core';

export default function App() {
  return (
    <div>
      <Typography>Styled slider powered by styled-components</Typography>
      <Slider defaultValue={30} aria-labelledby="primary-slider" color="primary" />
      <Slider defaultValue={30} aria-labelledby="secondary-slider" color="secondary" />
      <Slider defaultValue={30} disabled />
      <Slider
        defaultValue={30}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={110}
      />
    </div>
  );
}
