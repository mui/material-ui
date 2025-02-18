import * as React from 'react';
import Input from '@mui/joy/Input';

export default function TriggerFocusInput() {
  return (
    <Input
      placeholder="Looks like I'm focused but no"
      sx={{ '--Input-focused': 1, width: 256 }}
    />
  );
}
