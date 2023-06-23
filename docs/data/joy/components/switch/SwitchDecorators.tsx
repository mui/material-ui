import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import WavesRoundedIcon from '@mui/icons-material/WavesRounded';

export default function SwitchDecorators() {
  const [hot, setHot] = React.useState<boolean>(false);
  return (
    <Switch
      slotProps={{ input: { 'aria-label': 'hot mode' } }}
      startDecorator={
        <LocalFireDepartmentRoundedIcon
          sx={{ color: hot ? 'text.icon' : 'danger.600' }}
        />
      }
      endDecorator={
        <WavesRoundedIcon sx={{ color: hot ? 'primary.500' : 'text.icon' }} />
      }
      checked={hot}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setHot(event.target.checked)
      }
      sx={(theme) => ({
        [`&:not(.${switchClasses.checked})`]: {
          '--Switch-trackBackground': theme.vars.palette.danger[500],
          '&:hover': {
            '--Switch-trackBackground': theme.vars.palette.danger[600],
          },
        },
      })}
    />
  );
}
