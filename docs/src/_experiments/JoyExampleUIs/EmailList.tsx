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
              <Typography level="body3">Janet Erickson</Typography>
              <Typography level="body3" textColor="text.tertiary">
                14 Oct 2016
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
              <Typography level="body2">Hi, Thomas, You don&apos;t have...</Typography>
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
              <Typography level="body3">Janet Erickson</Typography>
              <Typography level="body3" textColor="text.tertiary">
                14 Oct 2016
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
              <Typography level="body2" textColor="text.tertiary">
                Hi, Thomas, You don&apos;t have...
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
              <Typography level="body3">Janet Erickson</Typography>
              <Typography level="body3" textColor="text.tertiary">
                14 Oct 2016
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
              <Typography level="body2" textColor="text.tertiary">
                Hi, Thomas, You don&apos;t have...
              </Typography>
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ m: 0 }} />
    </List>
  );
}
