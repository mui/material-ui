// noinspection BadExpressionStatementJS

import Snackbar from '@mui/material/Snackbar';
import { Snackbar as MySnackbar } from '@mui/material';

<Snackbar TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<MySnackbar TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<Snackbar
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
/>;
<MySnackbar
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
/>;
<Snackbar
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;
// should skip non MUI components
<NonMuiSnackbar TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
