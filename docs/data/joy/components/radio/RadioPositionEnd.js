import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Apartment from '@mui/icons-material/Apartment';

export default function RadioPositionEnd() {
  return (
    <RadioGroup name="people" overlay defaultValue="person">
      <List
        sx={(theme) => ({
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--List-item-paddingY': '1rem',
          '--List-item-radius': '8px',
          '--List-decorator-width': '32px',
          [`& .${radioClasses.root}`]: {
            flexGrow: 1,
            flexDirection: 'row-reverse',
            [`&.${radioClasses.checked}`]: {
              [`& .${radioClasses.action}`]: {
                inset: -1,
                border: '2px solid',
                borderColor: theme.vars.palette.primary[500],
              },
            },
          },
        })}
      >
        <ListItem variant="outlined">
          <ListItemDecorator>
            <Person />
          </ListItemDecorator>
          <Radio value="person" label="Individual" />
        </ListItem>
        <ListItem variant="outlined">
          <ListItemDecorator>
            <People />
          </ListItemDecorator>
          <Radio value="team" label="Team" />
        </ListItem>
        <ListItem variant="outlined">
          <ListItemDecorator>
            <Apartment />
          </ListItemDecorator>
          <Radio value="interprise" label="Interprise" />
        </ListItem>
      </List>
    </RadioGroup>
  );
}
