import * as React from 'react';
import Textarea from '@mui/joy/Textarea';

export default function FocusOutlineTextarea() {
  return (
    <Textarea
      placeholder="Type in here…"
      minRows={2}
      sx={{
        '&::before': {
          display: 'none',
        },
        '&:focus-within': {
          outline: '2px solid var(--Textarea-focusedHighlight)',
          outlineOffset: '2px',
        },
      }}
    />
  );
}
