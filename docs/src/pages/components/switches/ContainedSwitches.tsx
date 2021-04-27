import * as React from 'react';
import Switch from '@material-ui/core/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function ContainedSwitches() {
  return (
    <div>
      <Switch {...label} defaultChecked variant="contained" />
      <Switch {...label} variant="contained" />
      <Switch {...label} disabled defaultChecked variant="contained" />
      <Switch {...label} disabled variant="contained" />
      <Switch {...label} defaultChecked size="small" variant="contained" />
      <Switch {...label} size="small" variant="contained" />
      <Switch {...label} disabled defaultChecked size="small" variant="contained" />
      <Switch {...label} disabled size="small" variant="contained" />
    </div>
  );
}
