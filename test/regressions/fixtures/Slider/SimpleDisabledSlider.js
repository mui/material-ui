import * as React from 'react';
import Slider from '@material-ui/core/Slider';

export default function SimpleDisabledSlider() {
  return (
    <div style={{ width: 300, paddingTop: 50 }}>
      <Slider defaultValue={30} valueLabelDisplay="on" disabled />
    </div>
  );
}
