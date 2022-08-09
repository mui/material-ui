import * as React from 'react';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

export default function ExampleButtonCheckbox() {
  const [value, setValue] = React.useState([]);
  return (
    <List
      variant="soft"
      aria-label="Screens"
      role="group"
      row
      sx={{
        flexGrow: 0,
        '--List-gap': '8px',
        '--List-padding': '8px',
        '--List-radius': '8px',
      }}
    >
      {['mobile', 'laptop', 'monitor'].map((item) => (
        <ListItem key={item}>
          <ListItemDecorator
            sx={{
              zIndex: 2,
              pointerEvents: 'none',
              ...(value.includes(item) && { color: 'text.primary' }),
            }}
          >
            {
              {
                mobile: <PhoneAndroidIcon />,
                laptop: <LaptopIcon />,
                monitor: <TvIcon />,
              }[item]
            }
          </ListItemDecorator>
          <Checkbox
            disableIcon
            overlay
            label={item}
            checked={value.includes(item)}
            color="neutral"
            variant="plain"
            onChange={(event) => {
              if (event.target.checked) {
                setValue((val) => [...val, item]);
              } else {
                setValue((val) => val.filter((text) => text !== item));
              }
            }}
            sx={{
              [`& .${checkboxClasses.action}`]: {
                bgcolor: value.includes(item) ? 'background.surface' : 'transparent',
                boxShadow: value.includes(item) ? 'sm' : 'none',
                '&:hover': {
                  bgcolor: value.includes(item)
                    ? 'background.surface'
                    : 'transparent',
                },
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}
