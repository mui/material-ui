import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<MyDialog TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<Dialog
  slots={{
    root: 'div',
  }}
  TransitionComponent={CustomTransition}
  slotProps={{
    root: { className: 'foo' },
  }}
  TransitionProps={{ unmountOnExit: true }}
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
/>;
// should skip non MUI components
<NonMuiDialog TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
