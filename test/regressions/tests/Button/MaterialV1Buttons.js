// @flow

import React from 'react';
import Button from '@material-ui/core/Button';

export default function MaterialV1Buttons() {
  return (
    <div>
      <Button variant="text">Text</Button>
      <Button variant="text" color="primary">
        Text
      </Button>
      <Button variant="text" color="secondary">
        Text
      </Button>
      <Button variant="raised">Raised</Button>
      <Button variant="raised" color="primary">
        Raised
      </Button>
      <Button variant="raised" color="secondary">
        Raised
      </Button>
    </div>
  );
}
