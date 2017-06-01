// @flow

import React from 'react';
import Radio, { LabelRadio } from 'material-ui/Radio';

export default function DisabledRadio() {
  return (
    <div>
      <LabelRadio label="Foo" disabled />
      <Radio disabled />
      <Radio checked disabled />
    </div>
  );
}
