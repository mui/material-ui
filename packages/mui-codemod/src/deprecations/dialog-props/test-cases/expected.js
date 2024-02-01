import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog
  slots={{
    transition: CustomTransition,
    paper: CustomPaper
  }}
  slotProps={{
    paper: { className: 'paper' },

    transition: {
      timeout: 1000,
      unmountOnExit: true
    }
  }} />;
<Dialog slotProps={{
  transition: {
    timeout: 1000
  }
}} />;
<Dialog slotProps={{
  transition: {
    timeout: transitionDuration
  }
}} />;
<MyDialog
  slots={{
    transition: CustomTransition,
    paper: CustomTransition
  }}
  slotProps={{
    paper: paperProps,

    transition: {
      ...transitionVars,
      timeout: transitionDuration
    }
  }} />;

<Dialog
  slots={{
    root: 'div',
    transition: CustomTransition,
    paper: CustomPaper
  }}
  slotProps={{
    root: { className: 'foo' },
    paper: { className: 'paper' },

    transition: {
      timeout: 1000,
      unmountOnExit: true
    }
  }} />;
<MyDialog
  slots={{
    ...outerSlots,
    transition: CustomTransition,
    paper: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    paper: paperProps,

    transition: {
      ...transitionVars,
      timeout: transitionDuration
    }
  }} />;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  PaperComponent={CustomPaper}
  PaperProps={{ className: 'paper' }}
  transitionDuration={1000}
/>;
