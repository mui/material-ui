import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

export default function GroupCheckboxes() {
  return (
    <div>
      <Typography
        id="sandwich-group"
        level="body-sm"
        sx={{ fontWeight: 'lg', mb: 1 }}
      >
        Sandwich Dressings
      </Typography>
      <div role="group" aria-labelledby="sandwich-group">
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
      </div>
    </div>
  );
}
