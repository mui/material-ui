import Popover from '@mui/material/Popover';
import { Popover as MyPopover } from '@mui/material';

<Popover
  slots={{
    backdrop: CustomBackdrop,
    transition: CustomTransition
  }}
  slotProps={{
    backdrop: { timeout: 200 },
    paper: { elevation: 4 },
    transition: { timeout: 200 }
  }} />;

<Popover
  slotProps={{
    backdrop: {
      ...{ timeout: 200 },
      ...{ sx: { backgroundColor: 'red' } }
    },
    paper: {
      ...{ elevation: 4 },
      ...{ sx: { backgroundColor: 'blue' } }
    },
    transition: {
      ...{ timeout: 200 },
      ...{ onEnter: () => {} }
    },
  }}
  slots={{
    backdrop: CustomBackdrop,
    transition: CustomTransition
  }} />;

<MyPopover
  slots={{
    backdrop: CustomBackdrop,
    transition: CustomTransition
  }}
  slotProps={{
    backdrop: { timeout: 200 },
    paper: { elevation: 4 },
    transition: { timeout: 200 }
  }} />;

<CustomPopover
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ timeout: 200 }}
  PaperProps={{ elevation: 4 }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ timeout: 200 }}
/>;
