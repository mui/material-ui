import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

export default function SimpleDisabledSlider() {
  return (
    <Box sx={{ width: 300, pt: 6.25 }}>
      <Slider defaultValue={30} valueLabelDisplay="on" disabled />
    </Box>
  );
}
