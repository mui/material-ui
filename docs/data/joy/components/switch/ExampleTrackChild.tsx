import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function ExampleTrackChild() {
  return (
    <Stack direction="row" spacing={2}>
      <Switch
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                  On
                </Typography>
                <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                  Off
                </Typography>
              </React.Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '64px',
          '--Switch-trackHeight': '31px',
        }}
      />
      <Switch
        color="success"
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <span>I</span>
                <span>0</span>
              </React.Fragment>
            ),
            sx: {
              justifyContent: 'space-around',
            },
          },
        }}
        sx={{
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '52px',
          '--Switch-trackHeight': '31px',
        }}
      />
    </Stack>
  );
}
