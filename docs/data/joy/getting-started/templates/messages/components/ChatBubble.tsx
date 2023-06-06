import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';
import FileIcon from './FileIcon';

type ChatBubbleProps = {
  variant: 'sent' | 'received';
  message: string;
  attachment?: any;
  time: string;
  sender: string;
};

export default function ChatBubble({
  message,
  variant,
  time,
  attachment = null,
  sender,
}: ChatBubbleProps) {
  const isSent = variant === 'sent';
  return (
    <Box maxWidth="80%" minWidth={attachment ? '80%' : 'auto'}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="sm">{sender}</Typography>
        <Typography fontSize="xs">{time}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'sm',
            borderTopRightRadius: isSent ? 0 : 'sm',
            borderTopLeftRadius: isSent ? 'sm' : 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <FileIcon fileType={attachment.type} />
            <div>
              <Typography fontSize="sm">{attachment.fileName}</Typography>
              <Typography level="body2">{attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
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
          {message}
        </Sheet>
      )}
    </Box>
  );
}
