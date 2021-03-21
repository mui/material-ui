import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  return (
    <div>
      <Checkbox defaultChecked inputProps={{ 'aria-label': 'checked' }} />
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled' }} />
      <Checkbox disabled inputProps={{ 'aria-label': 'disabled' }} />
      <Checkbox disabled checked inputProps={{ 'aria-label': 'disabled checked' }} />
    </div>
  );
}
