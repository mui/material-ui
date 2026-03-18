import Dialog from '@mui/material-v7/Dialog';
import { Dialog as MyDialog } from '@mui/material-v7';

<Dialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
<MyDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
<Dialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
  PaperProps={PaperProps}
/>;
<MyDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
  PaperProps={PaperProps}
/>;
<Dialog
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  PaperProps={PaperProps}
/>;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
