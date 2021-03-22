import * as React from 'react';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

export default function ColorCheckboxes() {
  return (
    <div>
      <Checkbox defaultChecked inputProps={{ 'aria-label': 'secondary' }} />
      <Checkbox
        defaultChecked
        color="primary"
        inputProps={{ 'aria-label': 'primary' }}
      />
      <Checkbox
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'default' }}
      />
      <Checkbox
        defaultChecked
        inputProps={{ 'aria-label': 'custom' }}
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
