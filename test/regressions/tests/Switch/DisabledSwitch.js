// @flow

import React from 'react';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';

export default function DisabledSwitch() {
  return (
    <div>
      <FormControlLabel control={<Switch />} label="Foo" disabled />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  );
}
