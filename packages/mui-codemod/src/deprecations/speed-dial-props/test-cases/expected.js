import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@mui/material';

<SpeedDial slots={{
  transition: CustomTransition
}} />;
<MySpeedDial slots={{
  transition: CustomTransition
}} />;
<SpeedDial
  slots={{
    root: 'div',
    transition: CustomTransition
  }} />;
<MySpeedDial
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }} />;
<SpeedDial
  slots={{
    root: 'div',
    transition: SlotTransition,
  }} />;
// should skip non MUI components
<NonMuiSpeedDial TransitionComponent={CustomTransition} />;
