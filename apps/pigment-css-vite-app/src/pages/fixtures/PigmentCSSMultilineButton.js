import * as React from 'react';
import Button from '@mui/material/Button';
import Layout from './layout';

export default function MultilineButton() {
  return (
    <Layout>
      <Button variant="contained" style={{ width: 400 }}>
        {[
          'Contained buttons are rectangular-shaped buttons.',
          'They may be used inline.',
          'They lift and display ink reactions on press.',
        ].join(' ')}
      </Button>
    </Layout>
  );
}
