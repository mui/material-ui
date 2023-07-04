import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';

export default function PositionedMenu() {
  return (
    <Dropdown>
      <MenuButton
        id="positioned-demo-button"
        variant="outlined"
        color="neutral"
        slots={{ root: IconButton }}
      >
        <MoreVert />
      </MenuButton>
      <Menu id="positioned-demo-menu" placement="bottom-end">
        <MenuItem>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{' '}
          Edit post
        </MenuItem>
        <MenuItem disabled>
          <ListItemDecorator />
          Draft post
        </MenuItem>
        <ListDivider />
        <MenuItem variant="soft" color="danger">
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <DeleteForever />
          </ListItemDecorator>{' '}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
