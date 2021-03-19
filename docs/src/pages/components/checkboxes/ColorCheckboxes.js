import * as React from 'react';
import { green } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';

export default function ColorCheckboxes() {
  return (
    <div>
      <Checkbox defaultChecked name="checkedA" />
      <Checkbox defaultChecked name="checkedB" color="primary" />
      <Checkbox defaultChecked name="checkedC" color="default" />
      <Checkbox
        defaultChecked
        name="checkedD"
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
