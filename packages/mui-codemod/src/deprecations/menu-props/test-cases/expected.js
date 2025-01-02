import Menu from '@mui/material/Menu';
import { Menu as MyMenu } from '@mui/material';

<Menu
  slotProps={{
    list: { disablePadding: true },
    transition: { timeout: 200 }
  }}
  slots={{
    transition: CustomTransition
  }} />;

<Menu
  slotProps={{
    root: {
      disablePortal: true,
    },

    list: { disablePadding: true },
    transition: { timeout: 200 }
  }}
  slots={{
    transition: CustomTransition
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
  }}
  slots={{
    transition: CustomTransition
  }} />;

<MyMenu
  slotProps={{
    list: { disablePadding: true },
    transition: { timeout: 200 }
  }}
  slots={{
    transition: CustomTransition
  }} />;

<CustomMenu
  TransitionComponent={CustomTransition}
  MenuListProps={{ disablePadding: true }}
  TransitionProps={{ timeout: 200 }}
/>;
