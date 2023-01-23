import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function GroupCheckboxes() {
  return (
    <Box>
      <Typography id="sandwich-group" level="body2" fontWeight="lg" mb={1}>
        Sandwich Dressings
      </Typography>
      <Box role="group" aria-labelledby="sandwich-group">
        <List size="sm">
          <ListItem>
            <Checkbox label="Lettuce" defaultChecked />
          </ListItem>
          <ListItem>
            <Checkbox label="Tomato" />
          </ListItem>
          <ListItem>
            <Checkbox label="Mustard" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
