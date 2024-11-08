import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';

export default function EllipsisList() {
  return (
    <Box sx={{ width: 320 }}>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.15rem' }}
      >
        Inbox
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        <ListItem>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/1.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Brunch this weekend?</Typography>
            <Typography level="body-sm" noWrap>
              I&apos;ll be in your neighborhood doing errands this Tuesday.
            </Typography>
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemDecorator>
            <Avatar src="/static/images/avatar/2.jpg" />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Summer BBQ</Typography>
            <Typography level="body-sm" noWrap>
              Wish I could come, but I&apos;m out of town this Friday.
            </Typography>
          </ListItemContent>
        </ListItem>
      </List>
    </Box>
  );
}
