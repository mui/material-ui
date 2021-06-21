import * as React from 'react';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes() {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} defaultChecked color="secondary" />
      <Checkbox {...label} defaultChecked color="success" />
      <Checkbox {...label} defaultChecked color="default" />
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: green[800],
          '&.Mui-checked': {
            color: green[600],
          },
        }}
      />
    </div>
  );
}
