import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CondensedWithMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
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
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 1
        </Link>
        <Button
          size="small"
          onClick={handleClick}
          variant="outlined"
          color="primary"
        >
          •••
        </Button>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 5
        </Link>
        <Link color="primary" href="#condensed-with-menu">
          Breadcrumb 6
        </Link>
      </Breadcrumbs>
    </React.Fragment>
  );
}
