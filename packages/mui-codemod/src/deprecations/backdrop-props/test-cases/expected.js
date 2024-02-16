import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

<Backdrop slots={{
  transition: CustomTransition
}} slotProps={{
  transition: {
    timeout: 100
  }
}} />;
<MyBackdrop slots={{
  transition: CustomTransition
}} slotProps={{
  transition: {
    timeout: 100
  }
}} />;
<Backdrop
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },

    transition: {
      transition: {
        timeout: 100
      }
    }
  }} />;
<MyBackdrop
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,

    transition: {
      transition: {
        timeout: 100
      }
    }
  }} />;
// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} transitionDuration={100} />;
