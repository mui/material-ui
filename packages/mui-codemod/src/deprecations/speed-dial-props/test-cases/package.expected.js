import SpeedDial from '@org/ui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@org/ui/material';

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
