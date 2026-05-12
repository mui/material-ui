import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // @focus-start @padding 1
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      slotProps={{ input: { 'aria-label': 'controlled' } }}
    />
  );
  // @focus-end
}
