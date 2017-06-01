// @flow

import React from 'react';
import Button from 'material-ui/Button';

export default function RaisedButton() {
  return (
    <div>
      <Button raised>Default</Button>
      <Button raised primary>Primary</Button>
      <Button raised accent>Accent</Button>
      <Button raised contrast>Contrast</Button>
      <Button raised disabled accent>Disabled</Button>
    </div>
  );
}
