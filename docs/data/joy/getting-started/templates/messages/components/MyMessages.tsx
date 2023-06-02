import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Chip, IconButton, Input } from '@mui/joy';
import List from '@mui/joy/List';
import ConversationListItem from './ConversationListItem';
import MessagesPane from './MessagesPane';

const messages = [
  {
    time: 'Thursday 11:41am',
    sender: 'You',
    message: 'Awesome! Thanks. I’ll look at this today.',
  },
  {
    time: 'Thursday 11:44am',
    sender: 'Katherine Moss',
    message: 'No rush though — we still have to wait for Lana’s designs.',
  },
  {
    time: 'Thursday 11:41am',
    sender: 'You',
    message: 'Awesome! Thanks. I’ll look at this today.',
  },
  {
    time: 'Thursday 11:44am',
    sender: 'Katherine Moss',
    message: 'No rush though — we still have to wait for Lana’s designs.',
  },
  {
    time: 'Thursday 11:41am',
    sender: 'You',
    message: 'Awesome! Thanks. I’ll look at this today.',
  },
  {
    time: 'Thursday 11:44am',
    sender: 'Katherine Moss',
    message: 'No rush though — we still have to wait for Lana’s designs.',
  },
  {
    time: 'Thursday 10:16am',
    sender: 'Katherine Moss',
    message:
      'Thanks Olivia! Almost there. I’ll work on making those changes you suggested and will shoot it over.',
  },
  {
    time: 'Thursday 11:40am',
    sender: 'Katherine Moss',
    message:
      'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.',
  },
  {
    time: 'Thursday 11:40am',
    sender: 'Katherine Moss',
    message: 'Tech requirements.pdf',
    attachment: {
      type: 'PDF',
      size: '1.2 MB',
    },
  },
  {
    time: 'Thursday 11:41am',
    sender: 'You',
    message: 'Awesome! Thanks. I’ll look at this today.',
  },
  {
    time: 'Thursday 11:44am',
    sender: 'Katherine Moss',
    message: 'No rush though — we still have to wait for Lana’s designs.',
  },
  {
    time: 'Today 2:20pm',
    sender: 'Katherine Moss',
    message: 'Hey Olivia, can you please review the latest design when you can?',
  },
  {
    time: 'Just now',
    sender: 'You',
    message: 'Sure thing, I’ll have a look today. They’re looking great!',
  },
  {
    time: 'now',
    sender: 'Katherine Moss',
    message: 'Typing...',
  },
];

export default function MyProfile() {
  return (
    <Sheet
      sx={{
        bgcolor: 'background.body',
        flex: 1,

        width: '100%',
        mx: 'auto',
      }}
    >
      <Grid container>
        <Grid xs={12} md={4}>
          <Sheet
            sx={{
              // backgroundColor: 'background.body',
              // backgroundColor: 'blue',
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
            >
              <Typography
                level="h1"
                fontSize="xl2"
                endDecorator={
                  <Chip variant="outlined" color="neutral" size="sm">
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
            <Input
              startDecorator={<i data-feather="search" />}
              placeholder="Search"
              aria-label="Search"
            />
            {/* <Typography>conversations list</Typography> */}
            <List
              sx={{
                // bgcolor: 'background.body',
                minWidth: '100%',
                '--ListItemDecorator-size': '48px',
                '--ListItem-paddingLeft': '1.5rem',
                '--ListItem-paddingRight': '1rem',
              }}
            >
              <ConversationListItem selected />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
              <ConversationListItem />
            </List>
          </Sheet>
        </Grid>
        <Grid xs={12} md={8}>
          <MessagesPane messages={messages} />
        </Grid>
      </Grid>
    </Sheet>
  );
}
