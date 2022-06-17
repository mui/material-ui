import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

const data = [
  {
    name: 'Alex Jonnold',
    avatar: 'https://i.pravatar.cc/40?img=3',
    avatar2x: 'https://i.pravatar.cc/80?img=3',
    date: '21 Oct 2022',
    title: 'Details for our Yosemite Park hike',
    body: 'Hello, my friend! So, it seems that we are getting there…',
  },
  {
    name: 'Pete Sand',
    avatar: 'https://i.pravatar.cc/40?img=4',
    avatar2x: 'https://i.pravatar.cc/80?img=4',
    date: '06 Jul 2022',
    title: 'Tickets for our upcoming trip',
    body: 'Good day, mate! It seems that our tickets just arrived…',
  },
  {
    name: 'Kate Gates',
    avatar: 'https://i.pravatar.cc/40?img=5',
    avatar2x: 'https://i.pravatar.cc/80?img=5',
    date: '16 May 2022',
    title: 'Brunch this Saturday?',
    body: "Hey! I'll be around the city this weekend, how about a…",
  },
];

export default function EmailList() {
  return (
    <List>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem>
            <ListItemButton
              {...(index === 0 && { variant: 'soft', color: 'primary' })}
              sx={{ p: 2 }}
            >
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar
                  alt=""
                  src={item.avatar}
                  srcSet={item.avatar2x}
                  sx={{ borderRadius: 'sm' }}
                />
              </ListItemDecorator>
              <Box sx={{ pl: 2, width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5,
                  }}
                >
                  <Typography level="body3">{item.name}</Typography>
                  <Typography level="body3" textColor="text.tertiary">
                    {item.date}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ mb: 0.5 }}>{item.title}</Typography>
                  <Typography level="body2">{item.body}</Typography>
                </Box>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </React.Fragment>
      ))}
    </List>
  );
}
