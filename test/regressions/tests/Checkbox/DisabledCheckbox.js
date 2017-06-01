// @flow

import React from 'react';
import Checkbox, { LabelCheckbox } from 'material-ui/Checkbox';

export default function DisabledCheckbox() {
  return (
    <div>
      <LabelCheckbox label="Foo" disabled />
      <Checkbox disabled />
      <Checkbox checked disabled />
    </div>
  );
}
