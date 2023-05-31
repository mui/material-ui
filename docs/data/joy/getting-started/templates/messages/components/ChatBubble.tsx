import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function ChatBubble() {
  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography fontSize="sm">name</Typography>
        <Typography fontSize="xs">date/time</Typography>
      </Stack>
      <Sheet
        color="primary"
        variant="solid"
        sx={{ px: 1.75, py: 1.25, borderRadius: 'sm' }}
      >
        Sure thing, I’ll have a look today. They’re looking great!
      </Sheet>
    </div>
  );
}
