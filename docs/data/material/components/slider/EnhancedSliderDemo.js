import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EnhancedSlider } from '@mui/material/Slider';

function valuetext(value) {
  return `${value} units`;
}

export default function EnhancedSliderDemo() {
  const [singleValue, setSingleValue] = React.useState(30);
  const [rangeValue, setRangeValue] = React.useState([20, 80]);

  const handleSingleChange = (event, newValue, _activeThumb) => {
    if (typeof newValue === 'number') {
      setSingleValue(newValue);
    }
  };

  const handleRangeChange = (event, newValue, _activeThumb) => {
    if (Array.isArray(newValue)) {
      setRangeValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Typography gutterBottom>Enhanced Single Value Slider</Typography>
      <EnhancedSlider
        value={singleValue}
        onChange={handleSingleChange}
        aria-labelledby="enhanced-slider"
        getAriaValueText={valuetext}
        min={0}
        max={100}
        step={5}
      />
      <Typography gutterBottom sx={{ mt: 4 }}>
        Enhanced Range Slider
      </Typography>
      <EnhancedSlider
        value={rangeValue}
        onChange={handleRangeChange}
        aria-labelledby="enhanced-range-slider"
        getAriaValueText={valuetext}
        min={0}
        max={100}
        step={5}
      />
      <Typography gutterBottom sx={{ mt: 4 }}>
        Enhanced Slider with Custom Formatting
      </Typography>
      <EnhancedSlider
        defaultValue={50}
        aria-labelledby="enhanced-custom-slider"
        getAriaValueText={(value) => `${value}%`}
        min={0}
        max={100}
        step={10}
      />
    </Box>
  );
}
