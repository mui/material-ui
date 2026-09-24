import Popover from '@mui/material/Popover';
import { Popover as MyPopover } from '@mui/material';

<Popover
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ timeout: 200 }}
  PaperProps={{ elevation: 4 }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ timeout: 200 }}
/>;

<Popover
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ timeout: 200 }}
  PaperProps={{ elevation: 4 }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ timeout: 200 }}
  slotProps={{
    backdrop: { sx: { backgroundColor: 'red' } },
    paper: { sx: { backgroundColor: 'blue' } },
    transition: { onEnter: () => {} },
  }}
/>;

<MyPopover
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ timeout: 200 }}
  PaperProps={{ elevation: 4 }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ timeout: 200 }}
/>;

<CustomPopover
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ timeout: 200 }}
  PaperProps={{ elevation: 4 }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ timeout: 200 }}
/>;
