import * as React from 'react';
import Switch from '@mui/joy/Switch';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import WavesRoundedIcon from '@mui/icons-material/WavesRounded';

export default function SwitchDecorators() {
  const [dark, setDark] = React.useState<boolean>(false);
  return (
    <Switch
      color={dark ? 'primary' : 'danger'}
      slotProps={{ input: { 'aria-label': 'dark mode' } }}
      startDecorator={
        <LocalFireDepartmentRoundedIcon
          sx={[dark ? { color: 'text.tertiary' } : { color: 'danger.600' }]}
        />
      }
      endDecorator={
        <WavesRoundedIcon
          sx={[dark ? { color: 'primary.500' } : { color: 'text.tertiary' }]}
        />
      }
      checked={dark}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setDark(event.target.checked)
      }
    />
  );
}
