import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

// Icons import

export default function EmailList() {
  return (
    <List>
      <ListItem>
        <ListItemButton variant="soft" color="primary" sx={{ p: 2 }}>
          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
            <Box
              component="img"
              src="/static/images/avatar/1.jpg"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
              }}
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
              <Typography level="body3">Alex Jonnold</Typography>
              <Typography level="body3" textColor="text.tertiary">
                21 Oct 2022
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>
                Details for our Yosemite Park hike
              </Typography>
              <Typography level="body2">
                Hello, my friend! So, it seems that we are getting there...
              </Typography>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
      <ListItem>
        <ListItemButton sx={{ p: 2 }}>
          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
            <Box
              component="img"
              src="/static/images/avatar/2.jpg"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
              }}
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
              <Typography level="body3">Pete Sand</Typography>
              <Typography level="body3" textColor="text.tertiary">
                06 Jul 2022
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>Tickets for our upcoming trip</Typography>
              <Typography level="body2" textColor="text.tertiary">
                Good day, mate! It seems that our tickets just arrived...
              </Typography>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
      <ListItem>
        <ListItemButton sx={{ p: 2 }}>
          <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
            <Box
              component="img"
              src="/static/images/avatar/3.jpg"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
              }}
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
              <Typography level="body3">Kate Gates</Typography>
              <Typography level="body3" textColor="text.tertiary">
                16 May 2022
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>Brunch this Saturday?</Typography>
              <Typography level="body2" textColor="text.tertiary">
                Hey! I&apos;ll be around the city this weekend, how about a...
              </Typography>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
    </List>
  );
}
