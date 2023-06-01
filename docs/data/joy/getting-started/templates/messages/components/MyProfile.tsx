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
              px: 4,
              py: 3,
              height: '100dvh',
            }}
          >
            <Typography>messages list/item - an item has a chat bubble</Typography>

            <Stack spacing={2}>
              <ChatBubble variant="received" />
              <Divider>Today</Divider>
              <ChatBubble variant="sent" />
              <ChatBubble variant="sent" />
              <ChatBubble variant="received" />
            </Stack>
            <Textarea placeholder="Send a message" />
            <Button variant="solid" color="primary">
              Send
            </Button>
          </Sheet>
        </Grid>
      </Grid>
    </Sheet>
  );
}
