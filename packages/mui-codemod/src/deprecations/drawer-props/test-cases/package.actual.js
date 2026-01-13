import Drawer from '@org/ui/material/Drawer';
import SwipeableDrawer from '@org/ui/material/SwipeableDrawer';
import { Drawer as MyDrawer, SwipeableDrawer as MySwipeableDrawer } from '@org/ui/material';

<Drawer BackdropComponent={Backdrop} BackdropProps={{ transitionDuration: 300 }} />;
<SwipeableDrawer BackdropComponent={Backdrop} BackdropProps={{ transitionDuration: 300 }} />;

<Drawer PaperProps={{ elevation: 20 }} />;
<SwipeableDrawer PaperProps={{ elevation: 20 }} />;

<Drawer SlideProps={{ direction: 'right' }} />;
<SwipeableDrawer SlideProps={{ direction: 'right' }} />;

<MyDrawer
  BackdropComponent={Backdrop}
  BackdropProps={{ transitionDuration: 300 }}
  PaperProps={{ elevation: 20 }}
  SlideProps={{ direction: 'right' }}
/>;
<MySwipeableDrawer
  BackdropComponent={Backdrop}
  BackdropProps={{ transitionDuration: 300 }}
  PaperProps={{ elevation: 20 }}
  SlideProps={{ direction: 'right' }}
/>;

<CustomDrawer
  PopperComponent={CustomPopper}
  TransitionComponent={CustomTransition}
  PopperProps={{ disablePortal: true }}
  TransitionProps={{ timeout: 200 }}
/>;
