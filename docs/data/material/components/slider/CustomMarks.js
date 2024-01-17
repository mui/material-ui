import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

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

const Label = styled('div')(() => ({
  fontSize: '0.875rem',
  lineHeight: '1.5',
  fontWeight: 500,
  cursor: 'pointer',
}));

export default function CustomMarks() {
  const [val, setVal] = React.useState(MIN);
  const handleChange = (_, newValue) => {
    setVal(newValue);
  };
  return (
    <Box sx={{ width: 250 }}>
      <div>
        <Slider
          marks={marks}
          step={10}
          value={val}
          valueLabelDisplay="auto"
          min={MIN}
          max={MAX}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label onClick={() => setVal(MIN)}>{MIN} min</Label>
        <Label onClick={() => setVal(MAX)}>{MAX} max</Label>
      </div>
    </Box>
  );
}
