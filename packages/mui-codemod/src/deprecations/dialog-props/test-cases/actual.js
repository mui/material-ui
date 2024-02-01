import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  PaperComponent={CustomPaper}
  PaperProps={{ className: 'paper' }}
  transitionDuration={1000}
/>;
<Dialog transitionDuration={1000} />;
<Dialog transitionDuration={transitionDuration} />;
<MyDialog
  TransitionComponent={CustomTransition}
  TransitionProps={transitionVars}
  PaperComponent={CustomTransition}
  PaperProps={paperProps}
  transitionDuration={transitionDuration}
/>;

<Dialog
  slots={{
    root: 'div',
  }}
  TransitionComponent={CustomTransition}
  slotProps={{
    root: { className: 'foo' },
  }}
  TransitionProps={{ unmountOnExit: true }}
  PaperComponent={CustomPaper}
  PaperProps={{ className: 'paper' }}
  transitionDuration={1000}
/>;
<MyDialog
  slots={{
    ...outerSlots,
  }}
  TransitionComponent={CustomTransition}
  slotProps={{
    ...outerSlotProps,
  }}
  TransitionProps={transitionVars}
  PaperComponent={CustomTransition}
  PaperProps={paperProps}
  transitionDuration={transitionDuration}
/>;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  PaperComponent={CustomPaper}
  PaperProps={{ className: 'paper' }}
  transitionDuration={1000}
/>;
