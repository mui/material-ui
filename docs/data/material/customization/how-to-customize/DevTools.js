import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function DevTools() {
  return (
    <Slider
      defaultValue={30}
      sx={{
        width: 300,
        color: 'success.main',
        '& .MuiSlider-thumb': {
          borderRadius: '1px',
        },
      }}
    />
  );
}
