import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatProps } from '../types';
import { chats } from '../data';

// import GlobalStyles from '@mui/joy/GlobalStyles';

export function ChatsPaneWrapper({ children }: any) {
  return (
    <Sheet
      className="ChatsPaneWrapper"
      sx={{
        position: {
          xs: 'fixed',
          sm: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
          sm: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 100,
        // height: '100dvh',
        // width: 'var(--Foo-width)',
        width: '100%',
        top: 52,
        // p: 1.5,
        // py: 3,
        // flexShrink: 0,
        // display: 'flex',
        // flexDirection: 'column',
        // gap: 2,
        // borderRight: '1px solid',
        // borderColor: 'divider',
      }}
    >
      {/* <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Foo-width': '100%',
            // [theme.breakpoints.up('sm')]: {
            //   '--Foo-width': 'calc(100% /12 * 4)',
            // },
          },
        })}
      /> */}

      {children}
    </Sheet>
  );
}

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
          <ChatsPaneWrapper>
            <ChatsPane
              chats={chats}
              selectedChatId={selectedChat.id}
              setSelectedChat={setSelectedChat}
            />
          </ChatsPaneWrapper>
        </Grid>
        <Grid xs={12} sm={8}>
          <MessagesPane chat={selectedChat} />
        </Grid>
      </Grid>
    </Sheet>
  );
}
