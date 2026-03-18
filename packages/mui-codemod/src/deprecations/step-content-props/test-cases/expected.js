import StepContent from '@mui/material-v7/StepContent';
import { StepContent as MyStepContent } from '@mui/material-v7';

<StepContent slots={{
  transition: CustomTransition
}} slotProps={{
  transition: { unmountOnExit: true }
}} />;
<MyStepContent slots={{
  transition: CustomTransition
}} slotProps={{
  transition: transitionVars
}} />;
<StepContent
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },
    transition: { unmountOnExit: true }
  }} />;
<MyStepContent
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    transition: { unmountOnExit: true }
  }} />;
<StepContent slots={{ transition: SlotTransition }} />;
<StepContent
  slotProps={{ transition: {
    ...{ unmountOnExit: true },
    ...{ id: 'test' }
  } }} />;
// should skip non MUI components
<NonMuiStepContent
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
