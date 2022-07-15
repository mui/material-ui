import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function ExampleTrackChild() {
  return (
    <Switch
      componentsProps={{
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
        '--Switch-thumb-size': '27px',
        '--Switch-track-width': '64px',
        '--Switch-track-height': '31px',
      }}
    />
  );
}
