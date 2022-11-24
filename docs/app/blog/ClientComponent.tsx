'use client';
import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export default function ClientComponent() {
  const [color, setColor] = React.useState<ButtonProps['color']>('primary');
  return (
    <Button color={color} onClick={() => setColor(color === 'primary' ? 'secondary' : 'primary')}>
      ClientComponent
    </Button>
  );
}
