import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop TransitionComponent={CustomTransition} transitionDuration={100} />;
<MyBackdrop TransitionComponent={CustomTransition} transitionDuration={100} />;
<Backdrop
  TransitionComponent={CustomTransition}
  transitionDuration={100}
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { className: 'foo' },
  }}
/>;
<MyBackdrop
  TransitionComponent={CustomTransition}
  transitionDuration={100}
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    ...outerSlotProps,
  }}
/>;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} transitionDuration={100} />;
