import * as React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox defaultChecked name="checkedA" />}
        label="Secondary"
      />
      <FormControlLabel
        disabled
        control={<Checkbox name="checkedB" />}
        label="Disabled"
      />
    </FormGroup>
  );
}
