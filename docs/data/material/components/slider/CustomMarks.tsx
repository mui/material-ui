import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';

const MAX = 300;
const MIN = 30;
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
  lineHeight: '1.43',
  color: 'rgba(0, 0, 0, 0.87)',
  fontWeight: 400,
  cursor: 'pointer',
}));

export default function CustomMarks() {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number | number[]) => {
    setVal(newValue as number);
  };
  return (
    <Box sx={{ width: 250 }}>
      <div>
        <Slider
          value={val}
          marks={marks}
          step={10}
          defaultValue={MIN}
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
