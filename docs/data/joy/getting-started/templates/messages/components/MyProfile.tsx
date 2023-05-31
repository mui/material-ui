import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ChatBubble from './ChatBubble';

export default function MyProfile() {
  return (
    <Sheet
      sx={{
        bgcolor: 'background.body',
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        mx: 'auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} md={4}>
          <Typography level="h1" fontSize="xl2" sx={{ mb: 1 }}>
            Messages
          </Typography>
          <div>40 chip</div>
          <div>edit pencil</div>
          <Typography>conversations list</Typography>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography>messages list/item - an item has a chat bubble</Typography>

          <Stack spacing={2}>
            <ChatBubble />
            <Divider>Today</Divider>
            <ChatBubble />
            <ChatBubble />
            <ChatBubble />
          </Stack>
          <Textarea placeholder="Send a message" />
          <Button variant="solid" color="primary">
            Send
          </Button>
        </Grid>
      </Grid>
    </Sheet>
  );
}
