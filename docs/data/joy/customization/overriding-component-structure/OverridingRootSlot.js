import * as React from 'react';
import Button from '@mui/joy/Button';

export default function OverridingRootSlot() {
  return (
    <Button
      component="a"
      href="https://mui.com/about/"
      target="_blank"
      rel="noopener"
    >
      About us
    </Button>
  );
}
