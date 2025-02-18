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
      <Input
        placeholder="Type in here…"
        variant="soft"
        sx={{
          '--Input-radius': '0px',
          borderBottom: '2px solid',
          borderColor: 'neutral.outlinedBorder',
          '&:hover': {
            borderColor: 'neutral.outlinedHoverBorder',
          },
          '&::before': {
            border: '1px solid var(--Input-focusedHighlight)',
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
