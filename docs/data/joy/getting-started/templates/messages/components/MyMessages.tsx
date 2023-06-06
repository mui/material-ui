import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';

// const messages = [
//   {
//     time: 'Thursday 11:41am',
//     sender: 'You',
//     message: 'Awesome! Thanks. I’ll look at this today.',
//   },
//   {
//     time: 'Thursday 11:44am',
//     sender: 'Katherine Moss',
//     message: 'No rush though — we still have to wait for Lana’s designs.',
//   },
//   {
//     time: 'Thursday 11:41am',
//     sender: 'You',
//     message: 'Awesome! Thanks. I’ll look at this today.',
//   },
//   {
//     time: 'Thursday 11:44am',
//     sender: 'Katherine Moss',
//     message: 'No rush though — we still have to wait for Lana’s designs.',
//   },
//   {
//     time: 'Thursday 11:41am',
//     sender: 'You',
//     message: 'Awesome! Thanks. I’ll look at this today.',
//   },
//   {
//     time: 'Thursday 11:44am',
//     sender: 'Katherine Moss',
//     message: 'No rush though — we still have to wait for Lana’s designs.',
//   },
//   {
//     time: 'Thursday 10:16am',
//     sender: 'Katherine Moss',
//     message:
//       'Thanks Olivia! Almost there. I’ll work on making those changes you suggested and will shoot it over.',
//   },
//   {
//     time: 'Thursday 11:40am',
//     sender: 'You',
//     message:
//       'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.',
//   },
//   {
//     time: 'Thursday 11:40am',
//     sender: 'Katherine Moss',
//     message: 'Tech requirements.pdf',
//     attachment: {
//       fileName: 'Tech requirements.pdf',
//       type: 'pdf',
//       size: '1.2 MB',
//     },
//   },
//   {
//     time: 'Thursday 11:41am',
//     sender: 'You',
//     message: 'Awesome! Thanks. I’ll look at this today.',
//   },
//   {
//     time: 'Thursday 11:44am',
//     sender: 'Katherine Moss',
//     message: 'No rush though — we still have to wait for Lana’s designs.',
//   },
//   {
//     time: 'Today 2:20pm',
//     sender: 'Katherine Moss',
//     message: 'Hey Olivia, can you please review the latest design when you can?',
//   },
//   {
//     time: 'Just now',
//     sender: 'You',
//     message: 'Sure thing, I’ll have a look today. They’re looking great!',
//   },
//   {
//     time: 'now',
//     sender: 'Katherine Moss',
//     message: 'Typing...',
//   },
// ];

export type UserProps = {
  name: string;
  username: string;
  avatar: string;
  online: boolean;
};

export type MessageProps = {
  id: string;
  content: string;
  timestamp: string;
  unread?: boolean;
  sender: UserProps | 'You';
  attachment?: {
    fileName: string;
    type: string;
    size: string;
  };
};

export type ChatProps = {
  id: string;
  sender: UserProps;
  messages: MessageProps[];
};

const users: UserProps[] = [
  {
    name: 'Mabel Boyle',
    username: '@mabel',
    avatar: '/static/images/avatar/1.jpg',
    online: true,
  },
  {
    name: 'Katherine Moss',
    username: '@kathy',
    avatar: '/static/images/avatar/2.jpg',
    online: false,
  },
  {
    name: 'Phoenix Baker',
    username: '@phoenix',
    avatar: '/static/images/avatar/3.jpg',
    online: true,
  },
  {
    name: 'Eleanor Pena',
    username: '@eleanor',
    avatar: '/static/images/avatar/4.jpg',
    online: false,
  },
  {
    name: 'Katie Peterson',
    username: '@katie',
    avatar: '/static/images/avatar/5.jpg',
    online: true,
  },
  {
    name: 'Alice Sanders',
    username: '@alice',
    avatar: '/static/images/avatar/6.jpg',
    online: true,
  },
  {
    name: 'Melissa Van Der Berg',
    username: '@melissa',
    avatar: '/static/images/avatar/7.jpg',
    online: false,
  },
  {
    name: 'Frank Phillips',
    username: '@frank',
    avatar: '/static/images/avatar/8.jpg',
    online: false,
  },
];

const chats: ChatProps[] = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Hey, how are you?',
        timestamp: '6 mins ago',
        sender: users[0],
      },
      {
        id: '2',
        content: 'I’m good, how about you?',
        timestamp: '5 mins ago',
        sender: 'You',
      },
      {
        id: '3',
        timestamp: 'Just now',
        sender: 'You',
        content: 'Sure thing, I’ll have a look today. They’re looking great!',
      },
      {
        id: '4',
        timestamp: 'now',
        sender: users[0],
        content: 'Typing...',
      },
      {
        id: '5',
        timestamp: 'Thursday 11:40am',
        sender: users[0],
        content: 'Tech requirements.pdf',
        attachment: {
          fileName: 'Tech requirements.pdf',
          type: 'pdf',
          size: '1.2 MB',
        },
      },
    ],
  },
  {
    id: '2',
    sender: users[1],
    messages: [
      {
        id: '1',
        content:
          'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.',
        timestamp: '5 mins ago',
        sender: users[1],
        unread: true,
      },
    ],
  },
];

export default function MyProfile() {
  const [selectedChat, setSelectedChat] = React.useState<ChatProps>(chats[0]);
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
          <ChatsPane
            chats={chats}
            selectedChatId={selectedChat.id}
            setSelectedChat={setSelectedChat}
          />
        </Grid>
        <Grid xs={12} md={8}>
          <MessagesPane chat={selectedChat} />
        </Grid>
      </Grid>
    </Sheet>
  );
}
