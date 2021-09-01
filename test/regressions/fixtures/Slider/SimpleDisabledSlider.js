import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function SimpleDisabledSlider() {
  return (
    <div style={{ width: 300, paddingTop: 50 }}>
      <Slider defaultValue={30} valueLabelDisplay="on" disabled />
    </div>
  );
}
