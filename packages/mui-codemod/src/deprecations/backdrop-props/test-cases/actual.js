import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop TransitionComponent={CustomTransition} />;
<MyBackdrop TransitionComponent={CustomTransition} />;
<Backdrop
  TransitionComponent={CustomTransition}
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { className: 'foo' },
  }}
/>;
<MyBackdrop
  TransitionComponent={CustomTransition}
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    ...outerSlotProps,
  }}
/>;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} />;
