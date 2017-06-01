// @flow

import React from 'react';
import Button from 'material-ui/Button';

export default function FlatButton() {
  return (
    <div>
      <Button>Default</Button>
      <Button primary>Primary</Button>
      <Button accent>Accent</Button>
      <Button contrast>Contrast</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
