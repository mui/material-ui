import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import CheckIcon from '@mui/icons-material/Check';
import { Grid } from "@mui/material";

export default function ThumbControl() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{width: 250}}>
      <Grid container>
        <Grid item xs={6}>
          <Slider
            value={value}
            step={1}
            min={0}
            max={10}
            onChange={handleChange}
            onChangeCommitted={() => setValue(0)}
            aria-labelledby="thumb-control-slider"
          />
        </Grid>
        <Grid item xs={6}>
          {value > 9 ? <CheckIcon sx={{marginLeft: '1rem'}}/> : <Box />}
        </Grid>
      </Grid>
    </Box>
  );
}
