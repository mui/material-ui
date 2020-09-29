import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';
import Typography from '@material-ui/core/Typography';

export default function App() {
  return (
    <div>
      <Typography>Styled slider powered by styled-components</Typography>
      <Slider defaultValue={30} color="primary" />
      <Slider defaultValue={30} color="secondary" />
      <Slider defaultValue={30} disabled />
      <Slider defaultValue={30} valueLabelDisplay="auto" step={10} marks min={10} max={110} />
    </div>
  );
}
