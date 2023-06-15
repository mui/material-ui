import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';

export default function UnderlineTextarea() {
  return (
    <Stack spacing={2}>
      <Textarea
        minRows={2}
        placeholder="Type in here…"
        sx={{
          '&::before': {
            border: '1.5px solid var(--Textarea-focusedHighlight)',
            transform: 'scaleX(0)',
            left: '2.5px',
            right: '2.5px',
            bottom: 0,
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
            borderBottomLeftRadius: '64px 20px',
            borderBottomRightRadius: '64px 20px',
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      />
      <Textarea
        minRows={2}
        placeholder="Type in here…"
        variant="soft"
        sx={{
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 0,
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Textarea-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
          },
        }}
      />
    </Stack>
  );
}
