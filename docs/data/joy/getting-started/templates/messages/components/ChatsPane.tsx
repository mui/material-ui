import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import ChatListItem from './ChatListItem';
import { ChatProps } from '../types';

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function ChatsPane({
  chats,
  setSelectedChat,
  selectedChatId,
}: ChatsPaneProps) {
  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: 'calc(100dvh - var(--Header-height))',
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        py={{ xs: 1, md: 3 }}
        px={{ xs: 1, md: 2.5 }}
      >
        <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          fontWeight="lg"
          endDecorator={
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              slotProps={{ root: { component: 'span' } }}
            >
              40
            </Chip>
          }
        >
          Messages
        </Typography>

        <IconButton variant="outlined" aria-label="edit" color="neutral" size="sm">
          <i data-feather="edit" />
        </IconButton>
      </Stack>

      <Box px={{ xs: 1, md: 2 }} pb={1.5}>
        <Input
          startDecorator={<i data-feather="search" />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          minWidth: '100%',
          '--ListItemDecorator-size': '48px',
          '--ListItem-paddingLeft': '1.5rem',
          '--ListItem-paddingRight': '1rem',
          py: 0,
        }}
      >
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
          />
        ))}
      </List>
    </Sheet>
  );
}
