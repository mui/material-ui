import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/SliderStyled';

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    </Box>
  );
}
