import * as React from 'react';
import Button from '@mui/material-next/Button';

export default function MultilineButtonNext() {
  return (
    <Button variant="filled" style={{ width: 400 }}>
      {[
        'Contained buttons are rectangular-shaped buttons.',
        'They may be used inline.',
        'They lift and display ink reactions on press.',
      ].join(' ')}
    </Button>
  );
}
