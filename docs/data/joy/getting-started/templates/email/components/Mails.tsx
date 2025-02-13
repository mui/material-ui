import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

const data = [
  {
    name: 'Alex Jonnold',
    avatar: 'https://i.pravatar.cc/40?img=3',
    avatar2x: 'https://i.pravatar.cc/80?img=3',
    date: '21 Oct 2022',
    title: 'Details for our Yosemite Park hike',
    body: 'Hello, my friend! So, it seems that we are getting there…',
    color: 'warning.400',
  },
  {
    name: 'Pete Sand',
    avatar: 'https://i.pravatar.cc/40?img=4',
    avatar2x: 'https://i.pravatar.cc/80?img=4',
    date: '06 Jul 2022',
    title: 'Tickets for our upcoming trip',
    body: 'Good day, mate! It seems that our tickets just arrived…',
    color: 'success.400',
  },
  {
    name: 'Kate Gates',
    avatar: 'https://i.pravatar.cc/40?img=5',
    avatar2x: 'https://i.pravatar.cc/80?img=5',
    date: '16 May 2022',
    title: 'Brunch this Saturday?',
    body: "Hey! I'll be around the city this weekend, how about a…",
    color: 'primary.500',
  },
  {
    name: 'John Snow',
    avatar: 'https://i.pravatar.cc/40?img=7',
    avatar2x: 'https://i.pravatar.cc/80?img=7',
    date: '10 May 2022',
    title: 'Exciting News!',
    body: 'Hello there! I have some exciting news to share with you...',
    color: 'danger.500',
  },
  {
    name: 'Michael Scott',
    avatar: 'https://i.pravatar.cc/40?img=8',
    avatar2x: 'https://i.pravatar.cc/80?img=8',
    date: '13 Apr 2022',
    title: 'Upcoming Product Launch',
    body: 'Dear customers and supporters, I am thrilled to announc...',
    color: 'danger.500',
  },
];

export default function EmailList() {
  return (
    <List
      sx={{
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
          borderLeft: '2px solid',
          borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
        },
      }}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemButton
              {...(index === 0 && {
                selected: true,
                color: 'neutral',
              })}
              sx={{ p: 2 }}
            >
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar alt="" srcSet={item.avatar2x} src={item.avatar} />
              </ListItemDecorator>
              <Box sx={{ pl: 2, width: '100%' }}>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography level="body-xs">{item.name}</Typography>
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '99px',
                        bgcolor: item.color,
                      }}
                    />
                  </Box>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {item.date}
                  </Typography>
                </Box>
                <div>
                  <Typography level="title-sm" sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography level="body-sm">{item.body}</Typography>
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </React.Fragment>
      ))}
    </List>
  );
}
