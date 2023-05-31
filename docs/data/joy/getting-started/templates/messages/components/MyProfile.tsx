import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import ChatBubble from './ChatBubble';
import { Box, Chip, IconButton } from '@mui/joy';

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
      <Grid container>
        <Grid xs={12} md={4}>
          <Sheet
            sx={{
              // backgroundColor: 'background.body',
              // backgroundColor: 'blue',
              borderRight: '1px solid',
              borderColor: 'divider',
              height: '100dvh',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                level="h1"
                fontSize="xl2"
                sx={{ mb: 1 }}
                endDecorator={
                  <Chip variant="outlined" color="neutral" size="sm">
                    40
                  </Chip>
                }
              >
                Messages
              </Typography>

              <IconButton variant="outlined">edit</IconButton>
            </Stack>
            <Typography>conversations list</Typography>
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
