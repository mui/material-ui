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
  // const [isNew, setIsNew] = React.useState<boolean>(false);
  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: { xs: 0, sm: 'calc(100dvh - var(--Header-height))' },
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="row"
        // direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        py={3}
        px={2.5}
        display={{ xs: 'none', md: 'flex' }}
      >
        <Typography
          level="h1"
          fontSize={{ xs: 'md', md: 'xl2' }}
          endDecorator={
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                '--Chip-radius': '6px',
              }}
            >
              40
            </Chip>
          }
        >
          Messages
        </Typography>

        <IconButton variant="outlined" aria-label="edit" color="neutral">
          <i data-feather="edit" />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        p={1}
        display={{ xs: 'flex', md: 'none' }}
        // px={2.5}
      >
        <Typography
          level="h1"
          fontSize={{ xs: 'md', md: 'xl2' }}
          endDecorator={
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                '--Chip-radius': '6px',
              }}
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
          // bgcolor: 'background.body',
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
