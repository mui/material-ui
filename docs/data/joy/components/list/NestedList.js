import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';

export default function NestedList() {
  const [small, setSmall] = React.useState(false);
  return (
    <Box>
      <Switch
        size="sm"
        checked={small}
        onChange={(event) => setSmall(event.target.checked)}
        endDecorator={
          <Typography level="body2">Toggle small nested list</Typography>
        }
        sx={{ mb: 2 }}
      />
      <List
        variant="outlined"
        sx={{
          width: 200,
          borderRadius: 'sm',
        }}
      >
        <ListItem nested>
          <ListItem component="div">
            <Typography
              id="nested-list-demo-1"
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
            >
              Category 1
            </Typography>
          </ListItem>
          <List aria-labelledby="nested-list-demo-1" size={small ? 'sm' : undefined}>
            <ListItem>
              <ListItemButton>Subitem 1</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Subitem 2</ListItemButton>
            </ListItem>
          </List>
        </ListItem>
        <ListItem nested>
          <ListItem component="div">
            <Typography
              id="nested-list-demo-2"
              level="body3"
              textTransform="uppercase"
              fontWeight="lg"
            >
              Category 2
            </Typography>
          </ListItem>
          <List aria-labelledby="nested-list-demo-2" size={small ? 'sm' : undefined}>
            <ListItem>
              <ListItemButton>Subitem 1</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Subitem 2</ListItemButton>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </Box>
  );
}
