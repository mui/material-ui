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
        '--Switch-thumbSize': '16px',
        '--Switch-trackWidth': '40px',
        '--Switch-trackHeight': '24px',
        '--Switch-trackBackground': '#EE5E52',
        '&:hover': {
          '--Switch-trackBackground': '#EE5E52',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': '#5CB176',
          '&:hover': {
            '--Switch-trackBackground': '#5CB176',
          },
        },
      }}
    />
  );
}
