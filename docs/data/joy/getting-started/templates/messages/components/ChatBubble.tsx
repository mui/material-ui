import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

type ChatBubbleProps = {
  variant: 'sent' | 'received';
};

export default function ChatBubble({ variant }: ChatBubbleProps) {
  const isSent = variant === 'sent';
  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        {/* <Typography fontSize="sm">name</Typography> */}
        <Typography fontSize="sm">Katherine Moss</Typography>
        <Typography fontSize="xs">date/time</Typography>
      </Stack>
      <Sheet
        color={isSent ? 'primary' : 'neutral'}
        variant={isSent ? 'solid' : 'soft'}
        sx={{
          px: 1.75,
          py: 1.25,
          borderRadius: 'sm',
          borderTopRightRadius: isSent ? 0 : 'sm',
          borderTopLeftRadius: isSent ? 'sm' : 0,
        }}
      >
        Sure thing, I’ll have a look today. They’re looking great!
      </Sheet>
    </div>
  );
}
