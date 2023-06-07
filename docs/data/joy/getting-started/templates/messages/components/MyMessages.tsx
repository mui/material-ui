import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '../types';
import { chats } from '../data';

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
  return (
    <Sheet
      sx={{
        bgcolor: 'background.body',
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', lg: 0 },
      }}
    >
      <Grid container>
        <Grid xs={0} sm={4}>
          <ChatsPane
            chats={chats}
            selectedChatId={selectedChat.id}
            setSelectedChat={setSelectedChat}
          />
        </Grid>
        <Grid xs={12} sm={8}>
          <MessagesPane chat={selectedChat} />
        </Grid>
      </Grid>
    </Sheet>
  );
}
