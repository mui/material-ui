import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop slots={{
  transition: CustomTransition
}} slotProps={{
  transition: { unmountOnExit: true }
}} />;
<MyBackdrop slots={{
  transition: CustomTransition
}} slotProps={{
  transition: transitionVars
}} />;
<Backdrop
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },
    transition: { unmountOnExit: true }
  }} />;
<MyBackdrop
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    transition: { unmountOnExit: true }
  }} />;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
