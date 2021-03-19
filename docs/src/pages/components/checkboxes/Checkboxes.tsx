import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  return (
    <div>
      <Checkbox defaultChecked inputProps={{ 'aria-label': 'checked checkbox' }} />
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
      <Checkbox disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
      <Checkbox
        disabled
        checked
        inputProps={{ 'aria-label': 'disabled checked checkbox' }}
      />
    </div>
  );
}
