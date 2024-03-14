import * as React from 'react';
import Input from '@mui/joy/Input';

export default function FocusOutlineInput() {
  return (
    <Input
      placeholder="Type in here…"
      sx={{
        '&::before': {
          display: 'none',
        },
        '&:focus-within': {
          outline: '2px solid var(--Input-focusedHighlight)',
          outlineOffset: '2px',
        },
      }}
    />
  );
}
