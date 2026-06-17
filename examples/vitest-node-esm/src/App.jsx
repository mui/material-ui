import * as React from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TransitionGroup } from 'react-transition-group';

const initialItems = ['Item 1', 'Item 2', 'Item 3'];

export default function App() {
  const [items, setItems] = React.useState(initialItems);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h1">
        Vitest with Material UI transitions
      </Typography>
      <Fade in>
        <Typography>Faded in on first render</Typography>
      </Fade>
      <Button
        variant="outlined"
        onClick={() => setItems((previous) => [...previous, `Item ${previous.length + 1}`])}
      >
        Add item
      </Button>
      <List>
        <TransitionGroup>
          {items.map((item) => (
            <Collapse key={item}>
              <ListItem disableGutters>
                <ListItemText primary={item} />
              </ListItem>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </Stack>
  );
}
