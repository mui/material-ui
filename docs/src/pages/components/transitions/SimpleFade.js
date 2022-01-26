import * as React from 'react';

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';

const icon = (
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box component="svg" sx={{ width: 100, height: 100 }}>
      <Box
        component="polygon"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
        points="0,100 50,00, 100,100"
      />
    </Box>
  </Paper>
);

export default function SimpleFade() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <Fade in={checked}>{icon}</Fade>
      </Box>
    </Box>
  );
}
