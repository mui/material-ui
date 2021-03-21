import * as React from 'react';
import Switch from '@material-ui/core/Switch';

export default function BasicSwitches() {
  return (
    <div>
      <Switch defaultChecked inputProps={{ 'aria-label': 'checked' }} />
      <Switch inputProps={{ 'aria-label': 'unchecked' }} />
      <Switch
        disabled
        defaultChecked
        inputProps={{ 'aria-label': 'disabled checked' }}
      />
      <Switch disabled inputProps={{ 'aria-label': 'disabled unchecked' }} />
    </div>
  );
}
