import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      slotProps={{
        input: { 'aria-label': 'controlled' },
      }}
    />
  );
}
