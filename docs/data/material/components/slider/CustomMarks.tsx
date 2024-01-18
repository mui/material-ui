import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];
const labelStyle = {
  fontSize: '0.875rem',
  lineHeight: '1.43',
  fontWeight: 400,
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.6)',
};

export default function CustomMarks() {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        marks={marks}
        step={10}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography onClick={() => setVal(MIN)} sx={labelStyle}>
          {MIN} min
        </Typography>
        <Typography onClick={() => setVal(MAX)} sx={labelStyle}>
          {MAX} max
        </Typography>
      </Box>
    </Box>
  );
}
