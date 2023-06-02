import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Badge, Box, Chip, IconButton } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import AvatarWithStatus from './AvatarWithStatus';

type MessagesPaneProps = {
  messages: any;
};

export default function MessagesPane({ messages }: MessagesPaneProps) {
  return (
    <Sheet
      sx={{
        // px: 4,
        // py: 3,
        height: '100dvh',
      }}
    >
      <MessagesPaneHeader />

      {/* todo: come back and fix the height here once top bar and textarea are done */}
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100dvh - 177px)',
          px: 4,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack
          spacing={2}
          justifyContent="flex-end"
          // todo: will probably need to adjust this
        >
          {/* <Typography>messages list/item - an item has a chat bubble</Typography> */}
          {messages.map((message, index) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
                // maxWidth="80%"
              >
                {!isYou && (
                  <AvatarWithStatus
                    online={true}
                    src="/static/images/avatar/1.jpg"
                  />
                )}
                <ChatBubble
                  variant={isYou ? 'sent' : 'received'}
                  message={message.message}
                  attachment={message.attachment}
                  time={message.time}
                  sender={message.sender}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: 'green',
          px: 4,
          pb: 3,
        }}
      >
        <MessageInput />
      </Box>
    </Sheet>
  );
}
