import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (event: Event, newValue: number | number[]) => {
    if (typeof newValue !== 'number' && newValue[1] - newValue[0] >= 10) {
      setValue2(newValue as number[]);
    }
  };

  const [value3, setValue3] = React.useState<number[]>([20, 37]);

  const handleChange3 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (typeof newValue !== 'number') {
      if (newValue[1] - newValue[0] < 10) {
        if (activeThumb === 0) {
          setValue3([newValue[0], newValue[0] + 10]);
        } else {
          setValue3([newValue[1] - 10, newValue[1]]);
        }
      } else {
        setValue3(newValue as number[]);
      }
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="range-slider-demo" gutterBottom>
        Temperature range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        getAriaValueText={valuetext}
      />
      <Typography id="range-slider-demo" gutterBottom>
        Minimum distance
      </Typography>
      <Slider
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Typography id="range-slider-demo" gutterBottom>
        Minimum distance shift
      </Typography>
      <Slider
        value={value3}
        onChange={handleChange3}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider-demo"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
