import Snackbar from '@mui/material/Snackbar';
import { Snackbar as MySnackbar } from '@mui/material';

<Snackbar
  slots={{
    transition: CustomTransition,
  }}
  slotProps={{
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps,
    transition: CustomTransitionProps,
  }}
/>;
<MySnackbar
  slots={{
    transition: CustomTransition,
  }}
  slotProps={{
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps,
    transition: CustomTransitionProps,
  }}
/>;
<Snackbar
  slots={{
    root: 'div',
    transition: CustomTransition,
  }}
  slotProps={{
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps,
    transition: CustomTransitionProps,
  }}
/>;
<MySnackbar
  slots={{
    ...outerSlots,
    transition: CustomTransition,
  }}
  slotProps={{
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps,
    transition: CustomTransitionProps,
  }}
/>;
<Snackbar
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  slotProps={{
    clickAwayListener: CustomListenerProps,
    content: CustomContentProps,
    transition: CustomTransitionProps,
  }}
/>;
// should skip non MUI components
<NonMuiSnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
