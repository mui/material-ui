import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';
import FileIcon from './FileIcon';
import { MessageProps } from '../types';

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';

  // attachment?: any;
};

export default function ChatBubble({
  content,
  variant,
  timestamp,
  attachment = undefined,
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
        <Typography fontSize="sm">{sender.name}</Typography>
        <Typography fontSize="xs">{timestamp}</Typography>
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
          {content}
        </Sheet>
      )}
    </Box>
  );
}
