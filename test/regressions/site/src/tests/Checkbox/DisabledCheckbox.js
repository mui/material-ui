// @flow weak

import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default function DisabledCheckbox() {
  return (
    <div>
      <Checkbox label="Foo" disabled />
      <Checkbox disabled />
      <Checkbox checked disabled />
    </div>
  );
}
