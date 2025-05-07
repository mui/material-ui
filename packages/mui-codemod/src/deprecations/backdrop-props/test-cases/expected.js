import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop slots={{
  transition: CustomTransition
}} />;
<MyBackdrop slots={{
  transition: CustomTransition
}} />;
<Backdrop
  slots={{
    root: 'div',
    transition: CustomTransition
  }} />;
<MyBackdrop
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }} />;
<Backdrop
  slots={{
    root: 'div',
    transition: SlotTransition,
  }} />;

// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} />;

<Backdrop slots={{
  root: ComponentsRoot
}} slotProps={{ root: componentsRootProps }} />;
<MyBackdrop slotProps={{ root: slotsRootProps }} slots={{
  root: ComponentsRoot
}} />;
<Backdrop slots={{ root: SlotsRoot }} slotProps={{ root: componentsRootProps }} />;
<MyBackdrop
  slots={{ root: SlotsRoot }}
  slotProps={{ root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;

// should skip non MUI components
<NonMuiBackdrop components={{ Root: ComponentsRoot }} />;
