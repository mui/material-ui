import * as React from 'react';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export default function UnderlineInput() {
  return (
    <Stack spacing={2}>
      <Input
        placeholder="Type in here…"
        sx={{
          '&::before': {
            border: '1.5px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: '2px',
            right: '2px',
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
      <Input
        placeholder="Type in here…"
        variant="plain"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'neutral.outlinedBorder',
          borderRadius: 0,
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 0,
            right: 0,
            bottom: '-1px',
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
