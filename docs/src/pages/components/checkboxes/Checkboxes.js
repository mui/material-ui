import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const ariaLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes() {
  return (
    <div>
      <Checkbox {...ariaLabel} defaultChecked />
      <Checkbox {...ariaLabel} />
      <Checkbox {...ariaLabel} disabled />
      <Checkbox {...ariaLabel} disabled checked />
    </div>
  );
}
