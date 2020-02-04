import React from 'react';
import Button from '@material-ui/core/Button';

export default function MultilineButton() {
  return (
    <Button variant="contained" style={{ width: 400 }}>
      {[
        'Contained buttons are rectangular-shaped buttons.',
        'They may be used inline.',
        'They lift and display ink reactions on press.',
      ].join(' ')}
    </Button>
  );
}
