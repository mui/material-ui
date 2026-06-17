import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TransitionGroup } from 'react-transition-group';

const routeItems = ['Dashboard shell', 'Details route', 'Settings route'];

export function meta() {
  return [
    { title: 'React Router Node ESM SSR' },
    {
      name: 'description',
      content: 'Minimal React Router SSR app using Material UI transitions.',
    },
  ];
}

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        maxWidth: 720,
        mx: 'auto',
        px: 3,
        py: 5,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Stack spacing={2}>
        <Typography component="h1" variant="h4">
          React Router SSR with Material UI
        </Typography>
        <Typography color="text.secondary">
          This route renders through React Router&apos;s server build and imports MUI transition
          components from the installed package.
        </Typography>
        <Fade in timeout={0}>
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              bgcolor: 'background.paper',
              p: 2,
            }}
          >
            <Typography component="h2" variant="h6">
              Fade rendered during SSR
            </Typography>
          </Box>
        </Fade>
        <List dense sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <TransitionGroup>
            {routeItems.map((item) => (
              <Collapse key={item} timeout={0}>
                <ListItem>
                  <ListItemText primary={item} />
                </ListItem>
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Stack>
    </Box>
  );
}
