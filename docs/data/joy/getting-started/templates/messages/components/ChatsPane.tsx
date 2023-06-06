import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import ChatListItem from './ChatListItem';
import { ChatProps } from './MyMessages';

type ChatsPaneProps = {
  chats: ChatProps[];
};

export default function ChatsPane({ chats }: ChatsPaneProps) {
  // const [isNew, setIsNew] = React.useState<boolean>(false);
  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: '100dvh',
        overflowY: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        py={3}
        px={2.5}
      >
        <Typography
          level="h1"
          fontSize="xl2"
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
      <Box px={2} pb={1.5}>
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
          <ChatListItem key={chat.id} {...chat} />
        ))}
      </List>
    </Sheet>
  );
}
