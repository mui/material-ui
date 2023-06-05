import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ConversationsPane from './ConversationsPane';

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
    sender: 'You',
    message:
      'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.',
  },
  {
    time: 'Thursday 11:40am',
    sender: 'Katherine Moss',
    message: 'Tech requirements.pdf',
    attachment: {
      fileName: 'Tech requirements.pdf',
      type: 'pdf',
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
          <ConversationsPane messages={messages} />
        </Grid>
        <Grid xs={12} md={8}>
          <MessagesPane messages={messages} />
        </Grid>
      </Grid>
    </Sheet>
  );
}
