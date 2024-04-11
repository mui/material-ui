import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop TransitionComponent={CustomTransition} />;
<MyBackdrop TransitionComponent={CustomTransition} />;
<Backdrop
  TransitionComponent={CustomTransition}
  slots={{
    root: 'div',
  }}
/>;
<MyBackdrop
  TransitionComponent={CustomTransition}
  slots={{
    ...outerSlots,
  }}
/>;
<Backdrop
  TransitionComponent={ComponentTransition}
  slots={{
    root: 'div',
    transition: SlotTransition
  }}
/>;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} />;
