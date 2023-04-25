import * as React from 'react';
import Button from '@mui/joy/Button';

export default function DivButton() {
  return (
    <Button
      component="a"
      href="https://mui.com/about/"
      target="_blank"
      rel="noopener noreferrer"
    >
      About us
    </Button>
  );
}
