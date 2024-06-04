import * as React from 'react';
import Select from '@mui/joy/Select';
import Option, { optionClasses } from '@mui/joy/Option';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListItemDecorator, {
  listItemDecoratorClasses,
} from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';

export default function SelectGroupedOptions() {
  const group = {
    Land: ['Cat', 'Dog', 'Tiger', 'Reindeer', 'Raccoon'],
    Water: ['Dolphin', 'Flounder', 'Eel'],
    Air: ['Falcon', 'Winged Horse', 'Owl'],
  };
  const colors = {
    Land: 'neutral',
    Water: 'primary',
    Air: 'success',
  };
  return (
    <Select
      placeholder="Choose your animal"
      slotProps={{
        listbox: {
          component: 'div',
          sx: {
            maxHeight: 240,
            overflow: 'auto',
            '--List-padding': '0px',
            '--ListItem-radius': '0px',
          },
        },
      }}
      sx={{ width: 240 }}
    >
      {Object.entries(group).map(([name, animals], index) => (
        <React.Fragment key={name}>
          {index !== 0 && <ListDivider role="none" />}
          <List
            aria-labelledby={`select-group-${name}`}
            sx={{ '--ListItemDecorator-size': '28px' }}
          >
            <ListItem id={`select-group-${name}`} sticky>
              <Typography level="body-xs" sx={{ textTransform: 'uppercase' }}>
                {name} ({animals.length})
              </Typography>
            </ListItem>
            {animals.map((anim) => (
              <Option
                key={anim}
                value={anim}
                label={
                  <React.Fragment>
                    <Chip
                      size="sm"
                      color={colors[name]}
                      sx={{ borderRadius: 'xs', mr: 1 }}
                    >
                      {name}
                    </Chip>{' '}
                    {anim}
                  </React.Fragment>
                }
                sx={{
                  [`&.${optionClasses.selected} .${listItemDecoratorClasses.root}`]:
                    {
                      opacity: 1,
                    },
                }}
              >
                <ListItemDecorator sx={{ opacity: 0 }}>
                  <Check />
                </ListItemDecorator>
                {anim}
              </Option>
            ))}
          </List>
        </React.Fragment>
      ))}
    </Select>
  );
}
