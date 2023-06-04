import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import ConversationListItem from './ConversationListItem';

interface ConversationsPaneProps {
  messages: any;
}

const foo = [
  {
    id: '1',
    user: {
      name: 'Mabel Boyle',
      username: '@mabel',
      avatar: '/static/images/avatar/1.jpg',
      online: true,
    },
    messages: [
      {
        id: '1',
        content: 'Hey, how are you?',
        timestamp: '5 mins ago',
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Katherine Moss',
      username: '@kathy',
      avatar: '/static/images/avatar/2.jpg',
      online: false,
    },
    messages: [
      {
        id: '1',
        content:
          'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.',
        timestamp: '5 mins ago',
      },
    ],
  },
  {
    id: '3',
    user: {
      name: 'Phoenix Baker',
      username: '@phoenix',
      avatar: '/static/images/avatar/3.jpg',
      online: true,
    },
    messages: [
      {
        id: '1',
        content: 'no',
        timestamp: '5 mins ago',
      },
    ],
  },
];

export default function ConversationsPane({ messages }: ConversationsPaneProps) {
  const [isNew, setIsNew] = React.useState<boolean>(false);
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
      <Box
        // sx={{ backgroundColor: 'red' }}
        px={2}
        pb={1.5}
      >
        <Input
          startDecorator={<i data-feather="search" />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      {/* <Typography>conversations list</Typography> */}
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
        {foo.map((item) => (
          <ConversationListItem key={item.id} {...item} />
        ))}
        {/* <ConversationListItem selected isNew />
        <ConversationListItem />
        <ConversationListItem isNew />
        <ConversationListItem />
        <ConversationListItem />
        <ConversationListItem isNew />
        <ConversationListItem />
        <ConversationListItem />
        <ConversationListItem /> */}
      </List>
    </Sheet>
  );
}
