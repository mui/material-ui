import * as React from 'react';
import Checkbox from '@mui/joy/Checkbox';
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
      variant="outlined"
      aria-label="Screens"
      role="group"
      orientation="horizontal"
      sx={{
        flexGrow: 0,
        '--List-gap': '8px',
        '--List-padding': '8px',
        '--List-radius': '8px',
      }}
    >
      {['Mobile', 'Laptop', 'Monitor'].map((item) => (
        <ListItem key={item}>
          <ListItemDecorator
            sx={[
              {
                zIndex: 2,
                pointerEvents: 'none',
              },
              value.includes(item) && { color: 'text.primary' },
            ]}
          >
            {
              {
                Mobile: <PhoneAndroidIcon />,
                Laptop: <LaptopIcon />,
                Monitor: <TvIcon />,
              }[item]
            }
          </ListItemDecorator>
          <Checkbox
            disableIcon
            overlay
            label={item}
            checked={value.includes(item)}
            color="neutral"
            variant={value.includes(item) ? 'outlined' : 'plain'}
            onChange={(event) => {
              if (event.target.checked) {
                setValue((val) => [...val, item]);
              } else {
                setValue((val) => val.filter((text) => text !== item));
              }
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  bgcolor: checked ? 'background.level1' : 'transparent',
                  boxShadow: checked ? 'sm' : 'none',
                },
              }),
            }}
          />
        </ListItem>
      ))}
    </List>
  );
}
