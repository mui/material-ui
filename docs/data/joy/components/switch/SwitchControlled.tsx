import * as React from 'react';
import Switch from '@mui/joy/Switch';

export default function SwitchControlled() {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}
