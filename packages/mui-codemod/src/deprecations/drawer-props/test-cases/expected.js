import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Drawer as MyDrawer, SwipeableDrawer as MySwipeableDrawer } from '@mui/material';

<Drawer slots={{
  backdrop: Backdrop
}} slotProps={{
  backdrop: { transitionDuration: 300 }
}} />;
<SwipeableDrawer slots={{
  backdrop: Backdrop
}} slotProps={{
  backdrop: { transitionDuration: 300 }
}} />;

<Drawer slotProps={{
  root: { disablePortal: true }
}} />;
<SwipeableDrawer slotProps={{
  root: { disablePortal: true }
}} />;

<Drawer slotProps={{
  paper: { elevation: 20 }
}} />;
<SwipeableDrawer slotProps={{
  paper: { elevation: 20 }
}} />;

<Drawer slotProps={{
  transition: { direction: 'right' }
}} />;
<SwipeableDrawer slotProps={{
  transition: { direction: 'right' }
}} />;

<MyDrawer
  slots={{
    backdrop: Backdrop
  }}
  slotProps={{
    backdrop: { transitionDuration: 300 },
    root: { disablePortal: true },
    paper: { elevation: 20 },
    transition: { direction: 'right' }
  }} />;
<MySwipeableDrawer
  slots={{
    backdrop: Backdrop
  }}
  slotProps={{
    backdrop: { transitionDuration: 300 },
    root: { disablePortal: true },
    paper: { elevation: 20 },
    transition: { direction: 'right' }
  }} />;

<CustomDrawer
  PopperComponent={CustomPopper}
  TransitionComponent={CustomTransition}
  PopperProps={{ disablePortal: true }}
  TransitionProps={{ timeout: 200 }}
/>;
