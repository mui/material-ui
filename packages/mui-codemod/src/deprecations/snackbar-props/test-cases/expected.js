import Snackbar from '@mui/material/Snackbar';
import { Snackbar as MySnackbar } from '@mui/material';

<Snackbar
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    content: CustomContentProps,
    clickAwayListener: CustomListenerProps
  }} />;
<MySnackbar
  slots={{
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    content: CustomContentProps,
    clickAwayListener: CustomListenerProps
  }} />;
<Snackbar
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    content: CustomContentProps,
    clickAwayListener: CustomListenerProps
  }} />;
<MySnackbar
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps,
    content: CustomContentProps,
    clickAwayListener: CustomListenerProps
  }} />;
<Snackbar
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
    content: CustomContentProps,
    clickAwayListener: CustomListenerProps
  }} />;

// should skip non MUI components
<NonMuiSnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
