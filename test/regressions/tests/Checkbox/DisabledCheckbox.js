// @flow

import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

export default function DisabledCheckbox() {
  return (
    <div>
      <FormControlLabel disabled control={<Checkbox />} label="Foo" />
      <Checkbox disabled />
      <Checkbox checked disabled />
    </div>
  );
}
