import SpeedDial from '@mui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@mui/material';

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

<SpeedDial slotProps={{
  fab: CustomFabProps
}} />;
<MySpeedDial slotProps={{
  fab: CustomFabProps
}} />;
<SpeedDial
  slotProps={{
    transition: CustomTransitionProps,
    fab: CustomFabProps
  }} />;
<SpeedDial
  slotProps={{ fab: {
    ...CustomFabProps,
    ...{ size: 'small' }
  } }} />;
<NonMuiSpeedDial FabProps={CustomFabProps} />;
<SpeedDial
  slotProps={{ fab: ownerState => ({
    ...CustomFabProps,

    ...(ownerState => ({
      color: ownerState.open ? 'secondary' : 'primary'
    }))(ownerState)
  }) }} />;
