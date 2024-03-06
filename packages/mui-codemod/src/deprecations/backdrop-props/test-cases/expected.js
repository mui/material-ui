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
  }}
  slotProps={{
    root: { className: 'foo' },
  }} />;
<MyBackdrop
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
  }} />;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} />;
