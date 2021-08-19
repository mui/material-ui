import * as React from 'react';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';

export default function ThemeSwitch() {
  const label = { inputProps: { 'aria-label': 'Themed Switch' } };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
      <Switch defaultChecked {...label} />
      <Switch {...label} />
    </Box>
  );
}
