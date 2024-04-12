import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@mui/material';

<SpeedDial TransitionComponent={CustomTransition} />;
<MySpeedDial TransitionComponent={CustomTransition} />;
<SpeedDial
  TransitionComponent={CustomTransition}
  slots={{
    root: 'div',
  }}
/>;
<MySpeedDial
  TransitionComponent={CustomTransition}
  slots={{
    ...outerSlots,
  }}
/>;
<SpeedDial
  TransitionComponent={ComponentTransition}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;
// should skip non MUI components
<NonMuiSpeedDial TransitionComponent={CustomTransition} />;
