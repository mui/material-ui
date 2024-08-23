import * as React from 'react';
import Button from '@mui/material/Button';

function ClassesTest() {
  return (
    <Button
      classes={{
        outlined: 'extra-outlined',
        loadingIndicator: 'extra-loading-indicator',
        disabled: 'extra-disabled',
      }}
    >
      Button
    </Button>
  );
}
