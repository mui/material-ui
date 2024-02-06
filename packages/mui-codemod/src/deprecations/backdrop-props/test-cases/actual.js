import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<MyBackdrop TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<Backdrop
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { className: 'foo' },
  }}
/>;
<MyBackdrop
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    ...outerSlotProps,
  }}
/>;
// should skip non MUI components
<NonMuiBackdrop
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
