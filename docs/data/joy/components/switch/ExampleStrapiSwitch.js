import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';

export default function ExampleStrapiSwitch() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch
      color={checked ? 'success' : 'danger'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-thumb-size': '16px',
        '--Switch-track-width': '40px',
        '--Switch-track-height': '24px',
        '--Switch-track-background': '#EE5E52',
        '&:hover': {
          '--Switch-track-background': '#EE5E52',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-track-background': '#5CB176',
          '&:hover': {
            '--Switch-track-background': '#5CB176',
          },
        },
      }}
    />
  );
}
