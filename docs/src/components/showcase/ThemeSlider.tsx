import * as React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ThemeSlider() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : '#fff',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[200],
        borderRadius: 1,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          height: 180,
          padding: '0.75rem 0',
          borderRadius: 4,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : '#fff',
        }}
      >
        <Slider
          getAriaLabel={() => 'Temperature'}
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={[25, 50]}
          marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
          valueLabelFormat={valuetext}
          valueLabelDisplay="on"
        />
      </Box>
    </Box>
  );
}
