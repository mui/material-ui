import Menu from '@mui/material/Menu';
import { Menu as MyMenu } from '@mui/material';

<Menu MenuListProps={{ disablePadding: true }} TransitionProps={{ timeout: 200 }} />;

<Menu
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
  slotProps={{
    root: {
      disablePortal: true,
    },
  }}
/>;

<Menu
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
  slotProps={{
    root: {
      disablePortal: true,
    },
    list: {
      disableListWrap: true,
    },
    transition: {
      'aria-hidden': true,
    },
  }}
/>;

<MyMenu MenuListProps={{ disablePadding: true }} TransitionProps={{ timeout: 200 }} />;

<CustomMenu MenuListProps={{ disablePadding: true }} TransitionProps={{ timeout: 200 }} />;
