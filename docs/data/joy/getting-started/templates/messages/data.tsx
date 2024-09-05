import { ChatProps, UserProps } from './types';

export const users: UserProps[] = [
  {
    name: 'Steve E.',
    username: '@steveEberger',
    avatar: '/static/images/avatar/2.jpg',
    online: true,
  },
  {
    name: 'Katherine Moss',
    username: '@kathy',
    avatar: '/static/images/avatar/3.jpg',
    online: false,
  },
  {
    name: 'Phoenix Baker',
    username: '@phoenix',
    avatar: '/static/images/avatar/1.jpg',
    online: true,
  },
  {
    name: 'Eleanor Pena',
    username: '@eleanor',
    avatar: '/static/images/avatar/4.jpg',
    online: false,
  },
  {
    name: 'Kenny Peterson',
    username: '@kenny',
    avatar: '/static/images/avatar/5.jpg',
    online: true,
  },
  {
    name: 'Al Sanders',
    username: '@al',
    avatar: '/static/images/avatar/6.jpg',
    online: true,
  },
  {
    name: 'Melissa Van Der Berg',
    username: '@melissa',
    avatar: '/static/images/avatar/7.jpg',
    online: false,
  },
];

export const chats: ChatProps[] = [
  {
    id: '1',
    sender: users[0],
    messages: [
      {
        id: '1',
        content: 'Hi Olivia, I am currently working on the project.',
        timestamp: 'Wednesday 9:00am',
        sender: users[0],
      },
      {
        id: '2',
        content: 'That sounds great, Mabel! Keep up the good work.',
        timestamp: 'Wednesday 9:10am',
        sender: 'You',
      },
      {
        id: '3',
        timestamp: 'Wednesday 11:30am',
        sender: users[0],
        content: 'I will send the draft by end of the day.',
      },
      {
        id: '4',
        timestamp: 'Wednesday 2:00pm',
        sender: 'You',
        content: 'Sure, I will be waiting for it.',
      },
      {
        id: '5',
        timestamp: 'Wednesday 4:30pm',
        sender: users[0],
        content: 'Just a heads up, I am about to send the draft.',
      },
      {
        id: '6',
        content:
          "Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.",
        timestamp: 'Thursday 10:16am',
        sender: users[0],
      },
      {
        id: '7',
        content:
          "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        timestamp: 'Thursday 11:40am',
        sender: users[0],
      },
      {
        id: '3',
        timestamp: 'Thursday 11:40am',
        sender: users[0],
        content: 'Tech requirements.pdf',
        attachment: {
          fileName: 'Tech requirements.pdf',
          type: 'pdf',
          size: '1.2 MB',
        },
      },
      {
        id: '8',
        timestamp: 'Thursday 11:41am',
        sender: 'You',
        content: "Awesome! Thanks. I'll look at this today.",
      },
      {
        id: '9',
        timestamp: 'Thursday 11:44am',
        sender: users[0],
        content: "No rush though — we still have to wait for Lana's designs.",
      },
      {
        id: '10',
        timestamp: 'Today 2:20pm',
        sender: users[0],
        content: 'Hey Olivia, can you please review the latest design when you can?',
      },
      {
        id: '11',
        timestamp: 'Just now',
        sender: 'You',
        content: "Sure thing, I'll have a look today. They're looking great!",
      },
    ],
  },
  {
    id: '2',
    sender: users[1],
    messages: [
      {
        id: '1',
        content: 'Hi Olivia, I am thinking about taking a vacation.',
        timestamp: 'Wednesday 9:00am',
        sender: users[1],
      },
      {
        id: '2',
        content:
          'That sounds like a great idea, Katherine! Any idea where you want to go?',
        timestamp: 'Wednesday 9:05am',
        sender: 'You',
      },
      {
        id: '3',
        content: 'I am considering a trip to the beach.',
        timestamp: 'Wednesday 9:30am',
        sender: users[1],
      },
      {
        id: '4',
        content: 'The beach sounds perfect this time of year!',
        timestamp: 'Wednesday 9:35am',
        sender: 'You',
      },
      {
        id: '5',
        content: 'Yes, I agree. It will be a much-needed break.',
        timestamp: 'Wednesday 10:00am',
        sender: users[1],
      },
      {
        id: '6',
        content: 'Make sure to take lots of pictures!',
        timestamp: 'Wednesday 10:05am',
        sender: 'You',
      },
    ],
  },
  {
    id: '3',
    sender: users[2],
    messages: [
      {
        id: '1',
        content: 'Hey!',
        timestamp: '5 mins ago',
        sender: users[2],
        unread: true,
      },
    ],
  },
  {
    id: '4',
    sender: users[3],
    messages: [
      {
        id: '1',
        content:
          'Hey Olivia, I was thinking about doing some home improvement work.',
        timestamp: 'Wednesday 9:00am',
        sender: users[3],
      },
      {
        id: '2',
        content:
          'That sounds interesting! What kind of improvements are you considering?',
        timestamp: 'Wednesday 9:05am',
        sender: 'You',
      },
      {
        id: '3',
        content: 'I am planning to repaint the walls and replace the old furniture.',
        timestamp: 'Wednesday 9:15am',
        sender: users[3],
      },
      {
        id: '4',
        content:
          'That will definitely give your house a fresh look. Do you need help with anything?',
        timestamp: 'Wednesday 9:20am',
        sender: 'You',
      },
      {
        id: '5',
        content:
          'I might need some help with picking the right paint colors. Can we discuss this over the weekend?',
        timestamp: 'Wednesday 9:30am',
        sender: users[3],
      },
    ],
  },

  {
    id: '5',
    sender: users[4],
    messages: [
      {
        id: '1',
        content: 'Sup',
        timestamp: '5 mins ago',
        sender: users[4],
        unread: true,
      },
    ],
  },
  {
    id: '6',
    sender: users[5],
    messages: [
      {
        id: '1',
        content: 'Heyo',
        timestamp: '5 mins ago',
        sender: 'You',
        unread: true,
      },
    ],
  },

  {
    id: '7',
    sender: users[6],
    messages: [
      {
        id: '1',
        content:
          "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
        timestamp: '5 mins ago',
        sender: users[6],
        unread: true,
      },
    ],
  },
];
