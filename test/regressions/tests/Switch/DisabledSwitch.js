// @flow

import React from 'react';
import Switch, { LabelSwitch } from 'material-ui/Switch';

export default function DisabledSwitch() {
  return (
    <div>
      <LabelSwitch label="Foo" disabled />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  );
}
