import Menu from '@mui/material/Menu';
import { Menu as MyMenu } from '@mui/material';

<Menu
  slotProps={{
    list: { disablePadding: true },
    transition: { timeout: 200 }
  }} />;

<Menu
  slotProps={{
    root: {
      disablePortal: true,
    },

    list: { disablePadding: true },
    transition: { timeout: 200 }
  }} />;

<Menu
  slotProps={{
    root: {
      disablePortal: true,
    },
    list: {
      ...{ disablePadding: true },

      ...{
        disableListWrap: true,
      }
    },
    transition: {
      ...{ timeout: 200 },

      ...{
        'aria-hidden': true,
      }
    },
  }} />;

<MyMenu
  slotProps={{
    list: { disablePadding: true },
    transition: { timeout: 200 }
  }} />;

<CustomMenu MenuListProps={{ disablePadding: true }} TransitionProps={{ timeout: 200 }} />;
