// @flow weak

import React from 'react';
import Switch from 'material-ui/Switch';

export default function DisabledSwitch() {
  return (
    <div>
      <Switch label="Foo" disabled />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  );
}
