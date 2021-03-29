import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const minDistance = 10;
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    if (typeof newValue !== 'number' && newValue[1] - newValue[0] >= minDistance) {
      setValue(newValue);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (typeof newValue !== 'number') {
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - minDistance);
          setValue2([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setValue2([clamped - minDistance, clamped]);
        }
      } else {
        setValue2(newValue);
      }
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="minimum-distance-demo" gutterBottom>
        Minimum distance
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="minimum-distance-demo"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Typography id="minimum-distance-shift-demo" gutterBottom>
        Minimum distance shift
      </Typography>
      <Slider
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        aria-labelledby="minimum-distance-shift-demo"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
