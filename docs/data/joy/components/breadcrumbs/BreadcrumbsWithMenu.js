import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

export default function BreadcrumbsWithMenu() {
  return (
    <Dropdown>
      <Menu>
        <MenuItem>Breadcrumb 2</MenuItem>
        <MenuItem>Breadcrumb 3</MenuItem>
        <MenuItem>Breadcrumb 4</MenuItem>
      </Menu>
      <Breadcrumbs aria-label="breadcrumbs">
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 1
        </Link>
        <MenuButton size="sm" variant="plain" color="primary">
          •••
        </MenuButton>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 5
        </Link>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 6
        </Link>
      </Breadcrumbs>
    </Dropdown>
  );
}
