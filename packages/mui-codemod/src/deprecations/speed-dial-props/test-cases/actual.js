import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@mui/material';

<SpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<MySpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<SpeedDial
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
/>;
<MySpeedDial
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
/>;
<SpeedDial
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;
// should skip non MUI components
<NonMuiSpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
