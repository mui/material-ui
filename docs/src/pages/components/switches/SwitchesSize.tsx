import * as React from 'react';
import Switch from '@material-ui/core/Switch';

export default function SwitchesSize() {
  return (
    <div>
      <Switch defaultChecked size="small" inputProps={{ 'aria-label': 'small' }} />
      <Switch defaultChecked inputProps={{ 'aria-label': 'normal' }} />
    </div>
  );
}
