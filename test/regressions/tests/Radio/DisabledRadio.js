// @flow

import * as React from 'react';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

export default function DisabledRadio() {
  return (
    <div>
      <FormControlLabel disabled control={<Radio />} label="Foo" />
      <Radio disabled />
      <Radio checked disabled />
    </div>
  );
}
