// @flow weak

import React from 'react';
import Radio from 'material-ui/Radio';

export default function DisabledRadio() {
  return (
    <div>
      <Radio label="Foo" disabled />
      <Radio disabled />
      <Radio checked disabled />
    </div>
  );
}
