import Menu from '@mui/material-v7/Menu';
import { Menu as MyMenu } from '@mui/material-v7';

<Menu
  TransitionComponent={CustomTransition}
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
/>;

<Menu
  TransitionComponent={CustomTransition}
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
  slotProps={{
    root: {
      disablePortal: true,
    },
  }}
/>;

<Menu
  TransitionComponent={CustomTransition}
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

<MyMenu
  TransitionComponent={CustomTransition}
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
/>;

<CustomMenu
  TransitionComponent={CustomTransition}
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
/>;
