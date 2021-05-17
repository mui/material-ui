import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="minimum-distance-demo" gutterBottom>
        Minimum distance
      </Typography>
      <Slider
        value={value1}
        onChange={handleChange1}
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
