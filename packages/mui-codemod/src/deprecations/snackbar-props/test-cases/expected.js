import Snackbar from '@mui/material/Snackbar';
import { Snackbar as MySnackbar } from '@mui/material';

<Snackbar
  slots={{
    transition: CustomTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
  }}
/>;
<MySnackbar
  slots={{
    transition: CustomTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
  }}
/>;
<Snackbar
  slots={{
    root: 'div',
    transition: CustomTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
  }}
/>;
<MySnackbar
  slots={{
    ...outerSlots,
    transition: CustomTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
  }}
/>;
<Snackbar
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps,
  }}
/>;
// should skip non MUI components
<NonMuiSnackbar TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
