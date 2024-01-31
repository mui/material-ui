import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog
  slots={{
    transition: CustomTransition,
    paper: CustomPaper
  }}
  slotProps={{
    transition: { unmountOnExit: true },
    paper: { className: 'paper' }
  }} />;
<MyDialog
  slots={{
    transition: CustomTransition,
    paper: CustomTransition
  }}
  slotProps={{
    transition: transitionVars,
    paper: paperProps
  }} />;
<Dialog
  slots={{
    root: 'div',
    transition: CustomTransition,
    paper: CustomPaper
  }}
  slotProps={{
    root: { className: 'foo' },
    transition: { unmountOnExit: true },
    paper: { className: 'paper' }
  }} />;
<MyDialog
  slots={{
    ...outerSlots,
    transition: CustomTransition,
    paper: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    transition: transitionVars,
    paper: paperProps
  }} />;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  PaperComponent={CustomPaper}
  PaperProps={{ className: 'paper' }}
/>;
