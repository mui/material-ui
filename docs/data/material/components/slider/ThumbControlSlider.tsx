import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function NonLinearSlider() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        value={value}
        step={1}
        min={0}
        max={10}
        onChange={handleChange}
        onChangeCommitted={() => setValue(0)}
        aria-labelledby="thumb-control-slider"
      />
    </Box>
  );
}
