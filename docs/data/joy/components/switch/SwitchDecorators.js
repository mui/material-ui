import * as React from 'react';
import Switch from '@mui/joy/Switch';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

export default function SwitchDecorators() {
  const [dark, setDark] = React.useState(false);
  return (
    <Switch
      color={dark ? 'primary' : 'warning'}
      componentsProps={{ input: { 'aria-label': 'dark mode' } }}
      startDecorator={
        <LightMode sx={{ color: dark ? 'text.tertiary' : 'warning.600' }} />
      }
      endDecorator={
        <DarkMode sx={{ color: dark ? 'primary.500' : 'text.tertiary' }} />
      }
      checked={dark}
      onChange={(event) => setDark(event.target.checked)}
    />
  );
}
