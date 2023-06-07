import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';

type MessagesPaneProps = {
  chat: ChatProps;
};

export default function MessagesPane({ chat }: MessagesPaneProps) {
  const [textAreaHeight, setTextAreaHeight] = React.useState(112);

  const handleHeightChange = (height: number) => {
    setTextAreaHeight(height);
  };
  return (
    <Sheet
      sx={{
        height: { xs: 'calc(100dvh - var(--Header-height))', lg: '100dvh' },
        overflowY: 'hidden',
      }}
    >
      <MessagesPaneHeader sender={chat.sender} />

      <Box
        sx={{
          display: 'flex',
          height: `calc(100dvh - ${textAreaHeight}px - 113px - var(--Header-height))`,
          px: 4,
          py: 3,
          overflowY: 'scroll',
          flexDirection: 'column-reverse',
        }}
      >
        <Stack spacing={2} justifyContent="flex-end">
          {chat.messages.map((message: MessageProps, index: number) => {
            const isYou = message.sender === 'You';
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                flexDirection={isYou ? 'row-reverse' : 'row'}
              >
                {!isYou && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <MessageInput onHeightChange={handleHeightChange} />
    </Sheet>
  );
}
