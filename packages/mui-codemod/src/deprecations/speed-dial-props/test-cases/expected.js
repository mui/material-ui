import SpeedDial from '@mui/material-v7/SpeedDial';
import { SpeedDial as MySpeedDial } from '@mui/material-v7';

<SpeedDial slots={{
  transition: CustomTransition
}} slotProps={{
  transition: CustomTransitionProps
}} />;
<MySpeedDial slots={{
  transition: CustomTransition
}} slotProps={{
  transition: CustomTransitionProps
}} />;
<SpeedDial
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps
  }} />;
<MySpeedDial
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    transition: CustomTransitionProps
  }} />;
<SpeedDial
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  slotProps={{
    transition: CustomTransitionProps
  }} />;
// should skip non MUI components
<NonMuiSpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
