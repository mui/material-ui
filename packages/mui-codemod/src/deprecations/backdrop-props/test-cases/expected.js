import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop TransitionProps={{ unmountOnExit: true }} slots={{
  transition: CustomTransition
}} />;
<MyBackdrop TransitionProps={transitionVars} slots={{
  transition: CustomTransition
}} />;
<Backdrop
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },
  }} />;
<MyBackdrop
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
  }} />;
// should skip non MUI components
<NonMuiBackdrop
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
