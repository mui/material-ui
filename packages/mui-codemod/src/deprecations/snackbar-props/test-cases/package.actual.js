import Snackbar from '@org/ui/material/Snackbar';
import { Snackbar as MySnackbar } from '@org/ui/material';

<Snackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
<MySnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
<Snackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
/>;
<MySnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
/>;
<Snackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;

// should skip non MUI components
<NonMuiSnackbar
  ClickAwayListenerProps={CustomListenerProps}
  ContentProps={CustomContentProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
/>;
