import Snackbar from '@mui/material/Snackbar';
import { Snackbar as MySnackbar } from '@mui/material';

<Snackbar
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps
  }} />;
<MySnackbar
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps
  }} />;
<Snackbar
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps
  }} />;
<MySnackbar
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps
  }} />;
<Snackbar
  slots={{
    root: 'div',
    transition: SlotTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps
  }} />;
// should skip non MUI components
<NonMuiSnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
