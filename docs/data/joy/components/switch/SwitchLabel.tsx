import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function SwitchLabel() {
  return (
    <Typography component="label" endDecorator={<Switch sx={{ ml: 1 }} />}>
      Turn alarm on
    </Typography>
  );
}
