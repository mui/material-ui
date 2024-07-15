import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function GroupMenu() {
  const SIZES = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large'];
  const [size, setSize] = React.useState('Medium');

  return (
    <Dropdown>
      <MenuButton endDecorator={<ArrowDropDown />}>Size</MenuButton>
      <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }}>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) - 1;
            const value = nextIndex < 0 ? SIZES[SIZES.length - 1] : SIZES[nextIndex];
            setSize(value);
          }}
        >
          Smaller
        </MenuItem>
        <MenuItem
          onClick={() => {
            const nextIndex = SIZES.indexOf(size) + 1;
            const value = nextIndex > SIZES.length - 1 ? SIZES[0] : SIZES[nextIndex];
            setSize(value);
          }}
        >
          Larger
        </MenuItem>
        <ListDivider />
        <ListItem nested>
          <List aria-label="Font sizes">
            {SIZES.map((item: string) => (
              <MenuItem
                key={item}
                role="menuitemradio"
                aria-checked={item === size ? 'true' : 'false'}
                onClick={() => {
                  setSize(item);
                }}
              >
                <ListItemDecorator>
                  {item === size && <ArrowRight />}
                </ListItemDecorator>{' '}
                {item}
              </MenuItem>
            ))}
          </List>
        </ListItem>
      </Menu>
    </Dropdown>
  );
}
