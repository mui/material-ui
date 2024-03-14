import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import Apartment from '@mui/icons-material/Apartment';

export default function RadioPositionEnd() {
  return (
    <RadioGroup aria-label="Your plan" name="people" defaultValue="Individual">
      <List
        sx={{
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {['Individual', 'Team', 'Enterprise'].map((item, index) => (
          <ListItem variant="outlined" key={item} sx={{ boxShadow: 'sm' }}>
            <ListItemDecorator>
              {[<Person />, <People />, <Apartment />][index]}
            </ListItemDecorator>
            <Radio
              overlay
              value={item}
              label={item}
              sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  );
}
