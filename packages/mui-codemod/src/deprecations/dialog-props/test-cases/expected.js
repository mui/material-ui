import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    paper: PaperProps
  }} />;
<MyDialog
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    paper: PaperProps
  }} />;
<Dialog
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    paper: PaperProps
  }} />;
<MyDialog
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    paper: PaperProps
  }} />;
<Dialog
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
    paper: PaperProps
  }} />;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
