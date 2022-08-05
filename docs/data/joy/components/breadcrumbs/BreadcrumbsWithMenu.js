import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import * as React from 'react';

export default function BreadcrumbsWithMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="with-menu-demo-breadcrumbs"
      >
        <MenuItem onClick={handleClose}>Breadcrumb 2</MenuItem>
        <MenuItem onClick={handleClose}>Breadcrumb 3</MenuItem>
        <MenuItem onClick={handleClose}>Breadcrumb 4</MenuItem>
      </Menu>
      <Breadcrumbs aria-label="breadcrumbs">
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          underline="hover"
          color="primary"
          href="/"
          fontSize="inherit"
        >
          Breadcrumb 1
        </Link>
        <Button size="sm" onClick={handleClick} variant="plain" color="primary">
          •••
        </Button>
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          underline="hover"
          color="primary"
          href="/"
          fontSize="inherit"
        >
          Breadcrumb 5
        </Link>
        <Link
          // The `preventDefault` is for demonstration purposes, generally, you don't need it in your application
          onClick={(event) => event.preventDefault()}
          underline="hover"
          color="primary"
          href="/"
          fontSize="inherit"
        >
          Breadcrumb 6
        </Link>
      </Breadcrumbs>
    </React.Fragment>
  );
}
