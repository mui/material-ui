import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Badge, Chip, IconButton, Input } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import ChatBubble from './ChatBubble';
import ConversationListItem from './ConversationListItem';
import MessageInput from './MessageInput';

const messages = [
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
          <Sheet
            sx={{
              // px: 4,
              // py: 3,
              height: '100dvh',
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ borderBottom: '1px solid green', backgroundColor: 'yellow' }}
            >
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <Badge
                  color="success"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar size="lg" src="/static/images/avatar/1.jpg" />
                </Badge>
                <div>
                  <Typography
                    endDecorator={
                      <Chip
                        variant="outlined"
                        size="sm"
                        startDecorator={<Badge size="sm" />}
                      >
                        Online
                      </Chip>
                    }
                  >
                    Katherine Moss
                  </Typography>

                  <Typography>@kathy</Typography>
                </div>
              </Stack>
              <div>
                <Button>Call</Button>
                <Button>View profile</Button>
                <IconButton>kabob</IconButton>
              </div>
            </Stack>
            {/* todo: come back and fix the height here once top bar and textarea are done */}
            <Stack
              spacing={2}
              justifyContent="flex-end"
              sx={{ height: 'calc(100dvh - 300px)', px: 4, py: 3 }}
            >
              {/* <Typography>messages list/item - an item has a chat bubble</Typography> */}
              {messages.map((message, index) => {
                return (
                  <ChatBubble
                    key={index}
                    variant={message.sender === 'You' ? 'sent' : 'received'}
                    message={message.message}
                    attachment={message.attachment}
                    time={message.time}
                    sender={message.sender}
                  />
                );
              })}
              {/* <ChatBubble variant="received" />
              <Divider>Today</Divider>
              <ChatBubble variant="sent" />
              <ChatBubble variant="sent" />
              <ChatBubble variant="received" /> */}
            </Stack>
            {/* <Textarea placeholder="Send a message" minRows={2} />
            <Button variant="solid" color="primary">
              Send
            </Button> */}
            <MessageInput />
          </Sheet>
        </Grid>
      </Grid>
    </Sheet>
  );
}
